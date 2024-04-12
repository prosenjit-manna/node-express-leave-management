import axios from 'axios';
import dotenv from 'dotenv';
import { loginSuccessResponse } from '../../interface/api/auth/login/loginResponse.interface';
import { axiosInstance } from '../../lib/axiosInstance';
dotenv.config();

describe('login spec', () => {
  test('Successful login', async () => {
    const response = await axiosInstance.post(`/auth/login`, {
      username: process.env.OWNER_EMAIL,
      password: process.env.SEED_DEFAULT_PASSWORD,
    });
    loginSuccessResponse.parse(response.data);
  });

  test('Failed login', async () => {
    const response = await axiosInstance.post(`/auth/login`, {
      username: process.env.OWNER_EMAIL,
      password: process.env.SEED_DEFAULT_PASSWORD,
    });
    loginSuccessResponse.parse(response.data);
  });
});
