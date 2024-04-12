import { faker } from '@faker-js/faker';
import { axiosInstance } from '../../lib/axiosInstance';
import { get_env } from '../../lib/get-env';
import { registerErrorResponse, registerSuccessResponse } from '../../interface/api/auth/register/registerResponse.interface';

describe('login spec', () => {
  test('Successful Register', async () => {
    const response = await axiosInstance.post(`/auth/register`, {
      username: faker.internet.email(),
      password: get_env.SEED_DEFAULT_PASSWORD,
    });
    registerSuccessResponse.parse(response);
  });
  test('Error Register for duplicate user', async () => {
    try {
      await axiosInstance.post(`/auth/register`, {
        username: get_env.OWNER_EMAIL,
        password: get_env.SEED_DEFAULT_PASSWORD,
      });
    } catch (error) {
      registerErrorResponse.parse(error);
    }
  });
});
