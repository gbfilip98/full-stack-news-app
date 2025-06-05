import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:5000", // ✅ critical for proxy to kick in
});

export const postService = async (apiEndpoint: string, payload: any) => {
  try {
    // let configParams = {};
    // if (token) {
    //   configParams = {
    //     headers: { Authorization: `Bearer ${token}` },
    //   };
    // }

    const response = await api.post(`${apiEndpoint}`, payload);
    return response.data;
  } catch (error: any) {
    return Promise.reject(error.response?.data);
  }
}

export const getService = async (apiEndpoint: string, token: string) => {
  try {
    const configParams = {
        headers: { Authorization: `Bearer ${token}` },
    };

    const response = await api.get(`${apiEndpoint}`, configParams);
    return response.data;
  } catch (error: any) {
    return Promise.reject(error.response?.data);
  }
}

export const patchService = async (apiEndpoint: string, payload: any, token: string) => {
  try {
    const configParams = {
      headers: { authorization: `Bearer ${token}` },
    };

    const response = await api.patch(`${apiEndpoint}`, payload, configParams);
    return response.data;
  } catch (error: any) {
    return Promise.reject(error.response?.data);
  }
}

export default api;

// export const remove = async (apiEndpoint: string, payload: any, token: string) => {
//   try {
//     const configParams = {
//       headers: { authorization: `Bearer ${token}` },
//     };

//     const response = await axios.patch(`/${apiEndpoint}`, payload, configParams);
//     return response;
//   } catch (error: any) {
//     return Promise.reject(error?.response);
//   }
// }

// const api = axios.create({
//   baseURL: 'http://localhost:5000/api', // Backend API base URL
//   withCredentials: true,                // Needed if using cookies (for future auth flexibility)
// });

// // Attach JWT token to each request if available
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;

// import axios, { type AxiosError, type AxiosInstance } from 'axios';

// const api: AxiosInstance = axios.create({
//   baseURL: 'http://localhost:5000/api', // Change for production
//   withCredentials: true, // Enable cookie-based auth
//   timeout: 10000,
// });

// // ✅ Global Response Error Interceptor
// api.interceptors.response.use(
//   response => response,
//   (error: AxiosError) => {
//     if (error.response) {
//       const { status } = error.response;

//       if (status === 401) {
//         console.warn('Unauthorized, redirecting to login...');
//         window.location.href = '/login';
//       } else if (status === 403) {
//         alert('Forbidden. Please verify your email.');
//       } else if (status >= 500) {
//         alert('Server error. Please try again later.');
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;