import axios from 'axios';
import { LoginResponse } from './types';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3333', // https://url-shortener-959j.onrender.com
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // You can add common headers here, like Authorization tokens
    // config.headers.Authorization = `Bearer ${yourAuthToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    return Promise.reject(error);
  }
);

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post<LoginResponse>('/login', { email, password });
    return response.data;
  } catch (err) {
    //@ts-ignore
    if (err.response && err.response.data && err.response.data.errors && err.response.data.errors.length > 0) {
     //@ts-ignore
      throw new Error(err.response.data.errors[0].message);
    }
  }
};

export const signUp = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post<LoginResponse>('/register', { email, password });
    return response.data;
  } catch (err) {
    //@ts-ignore
    if (err.response && err.response.data && err.response.data.errors && err.response.data.errors.length > 0) {
     //@ts-ignore
      throw new Error(err.response.data.errors[0].message);
    }
  }
};

export const retrieveURLs = async () => {
  try {
    const response = await axiosInstance.get<LoginResponse>('/urls');
    return response.data;
  } catch (err) {
    //@ts-ignore
    if (err.response && err.response.data && err.response.data.errors && err.response.data.errors.length > 0) {
     //@ts-ignore
      throw new Error(err.response.data.errors[0].message);
    }
  }
};

export default axiosInstance;