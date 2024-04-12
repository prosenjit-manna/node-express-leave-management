import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: `http://${process.env.SERVER_URL}:${process.env.PORT}`,
  timeout: 1000,
});
