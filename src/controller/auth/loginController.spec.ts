import { loginErrorResponse, loginSuccessResponse } from '../../interface/api/auth/login/loginResponse.interface';
import { get_env } from '../../lib/get-env';
import { axiosInstance } from '../../lib/axiosInstance';
import { userModel } from '../../models/userModel';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { LoginRequest } from '../../interface/api/auth/login/loginRequest.interface';
import { range } from 'lodash';
import { dbConnect } from '../../lib/connection';
import mongoose from 'mongoose';

describe('login spec', () => {
  let mongoInstance: typeof mongoose | undefined;
  beforeAll(async () => {
    mongoInstance = await dbConnect();
  });
  afterAll(() => {
    if (mongoInstance) {
      mongoInstance.disconnect();
    }
  });

  test('Successful login', async () => {
    try {
      const response = await axiosInstance.post(`/auth/login`, {
        username: get_env.OWNER_EMAIL,
        password: get_env.SEED_DEFAULT_PASSWORD,
      });
      try {
        loginSuccessResponse.parse(response);
      } catch (error) {
        console.log(error);
        expect(error).toBeUndefined();
      }
    } catch (error) {
      console.log(error);
      expect(error).toBeUndefined();
    }
  });

  test('Failed login', async () => {
    try {
      await axiosInstance.post(`/auth/login`, {
        username: '',
        password: '',
      });
    } catch (error: any) {
      expect(error.error).toBe('Authentication failed');

      try {
        loginErrorResponse.parse(error);
      } catch (e) {
        expect(e).toBeUndefined();
      }
    }
  });

  test('Account not verified', async () => {
    await userModel.where({ username: get_env.OWNER_EMAIL }).updateOne({ emailVerified: false });
    try {
      await axiosInstance.post(`/auth/login`, {
        username: get_env.OWNER_EMAIL,
        password: get_env.SEED_DEFAULT_PASSWORD,
      });
    } catch (error: any) {
      expect(error.error).toBe('Your account is not verified. Please check your mail for verification token');

      try {
        loginErrorResponse.parse(error);
      } catch (e) {
        expect(e).toBeUndefined();
      }
    }
    await userModel.where({ username: get_env.OWNER_EMAIL }).updateOne({ emailVerified: true });
  }, 10000);

  test('Verification token is incorrect', async () => {
    const verificationToken = await bcrypt.hash(uuidv4(), 10);
    await userModel.where({ username: get_env.OWNER_EMAIL }).updateOne({ emailVerified: false, emailVerificationToken: verificationToken });

    const loginPayload: LoginRequest = {
      username: get_env.OWNER_EMAIL,
      password: get_env.SEED_DEFAULT_PASSWORD,
      verificationToken,
    };

    try {
      await axiosInstance.post(`/auth/login`, loginPayload);
    } catch (error: any) {
      expect(error.error).toBe('Verification token is incorrect');

      try {
        loginErrorResponse.parse(error);
      } catch (e) {
        expect(e).toBeUndefined();
      }
    }
    await userModel.where({ username: get_env.OWNER_EMAIL }).updateOne({ emailVerified: true, emailVerificationToken: null });
  });

  test('Account lockout', async () => {
    await userModel.where({ username: get_env.OWNER_EMAIL }).updateOne({ emailVerified: true, emailVerificationToken: null });

    for (const i of range(0, 4)) {
      const loginPayload: LoginRequest = {
        username: get_env.OWNER_EMAIL,
        password: 'wrong_password',
      };
      try {
        await axiosInstance.post(`/auth/login`, loginPayload);
      } catch (e) {
        expect(e).not.toBeUndefined();
      }
    }

    const loginPayload: LoginRequest = {
      username: get_env.OWNER_EMAIL,
      password: get_env.SEED_DEFAULT_PASSWORD,
    };

    try {
      await axiosInstance.post(`/auth/login`, loginPayload);
    } catch (error: any) {
      expect(error.error).toBe('Authentication failed. your account has been lockout for 30 min. You can try after some time');

      try {
        loginErrorResponse.parse(error);
      } catch (e) {
        expect(e).toBeUndefined();
      }
    }
    await userModel.where({ username: get_env.OWNER_EMAIL }).updateOne({ failedAttempt: 0, lockoutTime: null, emailVerified: true });
  });
});
