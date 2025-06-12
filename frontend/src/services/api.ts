import type { IArticle } from "@/types/Article";
import type { ILoginData, IRegisterData, IToken } from "@/types/Auth";
import type { IUrl } from "@/types/User";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // critical for proxy to kick in - vite.config.ts
});

export const postService = async (
  apiEndpoint: string,
  payload: ILoginData | IRegisterData
) => {
  try {
    const response = await api.post(`${apiEndpoint}`, payload);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const serverData = error.response?.data;
      return Promise.reject(serverData || error.message);
    }
    return Promise.reject(error);
  }
};

export const getService = async (apiEndpoint: string, token: string) => {
  try {
    const configParams = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const response = await api.get(`${apiEndpoint}`, configParams);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const serverData = error.response?.data;
      return Promise.reject(serverData || error.message);
    }
    return Promise.reject(error);
  }
};

export const patchService = async (
  apiEndpoint: string,
  payload: IArticle | IUrl | IToken,
  token: string
) => {
  try {
    const configParams = {
      headers: { authorization: `Bearer ${token}` },
    };

    const response = await api.patch(`${apiEndpoint}`, payload, configParams);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const serverData = error.response?.data;
      return Promise.reject(serverData || error.message);
    }
    return Promise.reject(error);
  }
};

export default api;

// export const deleteService = async (apiEndpoint: string, payload: unknown, token: string) => {
//   try {
//     const configParams = {
//       headers: { authorization: `Bearer ${token}` },
//     };

//     const response = await api.delete(`/${apiEndpoint}`, payload, configParams);
//   return response;
// } catch (error: unknown) {
//   if (axios.isAxiosError(error)) {
//     const serverData = error.response?.data;
//     return Promise.reject(serverData || error.message);
//   }
//   return Promise.reject(error);
// }
// }
