import { useState } from "react";
import AuthForm from "../components/AuthForm";
import { login, signUp } from "../services";
import { toast } from "react-toastify";
import { useRouter } from 'next/router';
import  axiosInstance  from '../services'


export default function Home() {
  const [isSignUp, setIsSignup] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleFormSubmit = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = isSignUp ? await signUp(email, password) :  await login(email, password);
      const token = response?.token;
      if (token) {
        localStorage.setItem('token', token); 
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set default headers for future requests
        toast.success(isSignUp ? 'Sign up successful' : 'Login Successful');
       await router.push('/dashboard'); 
      }
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignUp);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex min-h-full flex-col justify-center p-6 lg:px-8 border rounded-[10px] border-[#D0D5DD] bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-[#101928]">
            {isSignUp ? "Create an account" : "Log In"}
          </h2>
          <small className="text-[#667185]">
            Enter your credentials to {isSignUp ? "create" : "access"} your
            account
          </small>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <AuthForm isSignUp={isSignUp} onSubmit={handleFormSubmit} isLoading={isLoading} />

          <p className="mt-10 text-center text-sm text-[#98A2B3]">
            {isSignUp ? "Already have an account" : "Are you new here"}?
            <a
              href="#"
              className="font-semibold leading-6 text-[#3976E8]"
              onClick={toggleMode}
            >
              &nbsp;&nbsp;{isSignUp ? "Log in" : "Create Account"}
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
