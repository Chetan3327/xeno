import { LoginForm } from '../components/auth/LoginForm.jsx'

const Login = () => {
  return (
    <div className="flex min-h-svh w-full justify-center p-6 md:p-10">
      <div className="w-full max-w-sm mt-44">
        <LoginForm />
      </div>
    </div>
  )
}

export default Login