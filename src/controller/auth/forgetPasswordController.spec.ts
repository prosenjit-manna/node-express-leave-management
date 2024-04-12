import mongoose from 'mongoose';
import { ForgetPasswordRequest } from '../../interface/api/auth/forgetPassword/forgetPasswordRequest.interface';
import { ForgetPasswordResponse, forgetPasswordResponse } from '../../interface/api/auth/forgetPassword/forgetPasswordResponse.interface';
import { axiosInstance } from '../../lib/axiosInstance';
import { get_env } from '../../lib/get-env';
import { dbConnect } from '../../lib/connection';
import { userModel } from '../../models/userModel';
import { ResetPasswordRequest } from '../../interface/api/auth/resetPassword/resetPasswordRequest.interface';

describe('Forget Password', () => {
  let emailVerificationToken: string;

  let mongoInstance: typeof mongoose | undefined;
  beforeAll(async () => {
    mongoInstance = await dbConnect();
  });
  afterAll(() => {
    if (mongoInstance) {
      mongoInstance.disconnect();
    }
  });

  test('Try forget password with valid email', async () => {
    const payload: ForgetPasswordRequest = {
      email: get_env.OWNER_EMAIL,
    };
    try {
      const response: ForgetPasswordResponse = await axiosInstance().post('/auth/forget-password', payload);
      expect(response.message).toBe('Please check your email for password reset link');
      try {
        forgetPasswordResponse.parse(response);
      } catch (e) {
        expect(e).toBeUndefined();
      }
    } catch (error) {
      expect(error).toBeUndefined();
    }

    const user = await userModel.findOne({ username: get_env.OWNER_EMAIL });
    emailVerificationToken = user?.emailVerificationToken as string;
    expect(user?.emailVerificationToken).toBeDefined();
  });

  test('Try Reset password with token', async () => {
    const payload: ResetPasswordRequest = {
      password: get_env.SEED_DEFAULT_PASSWORD,
      token: emailVerificationToken,
    };
    try {
      await axiosInstance().post('/auth/reset-password', payload);
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });
});
