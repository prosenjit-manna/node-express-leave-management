import axios from 'axios';
import { get_env } from './get-env';

export const axiosInstance = axios.create({
  baseURL: `http://${get_env.SERVER_URL}:${get_env.PORT}`,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  function (error) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response?.data || error.message);
    } else {
      return Promise.reject(error);
    }
  },
);
