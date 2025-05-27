import axios, { type AxiosError, type AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Change for production
  withCredentials: true, // Enable cookie-based auth
  timeout: 10000,
});

// ✅ Global Response Error Interceptor
api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        console.warn('Unauthorized, redirecting to login...');
        window.location.href = '/login';
      } else if (status === 403) {
        alert('Forbidden. Please verify your email.');
      } else if (status >= 500) {
        alert('Server error. Please try again later.');
      }
    }

    return Promise.reject(error);
  }
);

export default api;