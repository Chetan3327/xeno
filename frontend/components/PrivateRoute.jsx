import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '@/providers/user-context';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) return null; // or a loading spinner

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
