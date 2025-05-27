import axios from 'axios';

const externalApi = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔐 Optional: intercept response errors globally
externalApi.interceptors.response.use(
  res => res,
  (error) => {
    console.error('External API error:', error.message);
    return Promise.reject(error);
  }
);

export default externalApi;