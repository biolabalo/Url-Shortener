import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';


export default function App({ Component, pageProps }: AppProps) {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); 
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      if(router.pathname !== '/'){
        router.push('/');
      }
      // Redirect to login if not authenticated (except login/signup pages)
    } else{
      if(router.pathname === '/'){
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, router.pathname]);

  return (
    <>
      <ToastContainer />
      <Component {...pageProps} />
    </>
  );
}




