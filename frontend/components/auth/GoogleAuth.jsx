import { UserContext } from '@/providers/user-context';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

const GoogleAuth = () => {
  const navigate = useNavigate();
  console.log(clientId)
  const {login} = useContext(UserContext);

  const handleLoginSuccess = async (response) => {
    const { credential } = response;
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        login(data.user);
        navigate('/create-campaign');
      }
    } catch (error) {
      console.error('Error during Google authentication:', error);
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin onSuccess={handleLoginSuccess} onError={() => console.log('Login Failed')}  />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
