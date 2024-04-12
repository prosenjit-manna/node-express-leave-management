import { LoginRequest } from '../interface/api/auth/login/loginRequest.interface';
import { LoginSuccessResponse } from '../interface/api/auth/login/loginResponse.interface';
import { UserType } from '../interface/data/userType.enum';
import { axiosInstance } from '../lib/axiosInstance';
import { get_env } from '../lib/get-env';

export async function getAuthenticatedClient(userType: UserType ) {
  let user: Partial<LoginRequest> = {};

  const email_part = get_env.OWNER_EMAIL.split('@');
  const org_email = `${email_part[0]}-org@${email_part[1]}`;
  const user_email = `${email_part[0]}-user-${0}@${email_part[1]}`;

  if (userType === UserType.ORG_OWNER) {
    user = { username: get_env.OWNER_EMAIL, password: get_env.SEED_DEFAULT_PASSWORD };
  }

  if (userType === UserType.ORG_OWNER) {
    user = { username: org_email, password: get_env.SEED_DEFAULT_PASSWORD };
  }

  if (userType === UserType.USER) {
    user = { username: user_email, password: get_env.SEED_DEFAULT_PASSWORD };
  }

  console.log('Authenticate with', user);
  const response: LoginSuccessResponse = await axiosInstance.post(`/auth/login`, user);

  axiosInstance.interceptors.request.use(
    (request) => {
      request.headers.Authorization = response.token;
      return request;
    },
    (e) => Promise.reject(e),
  );

  return axiosInstance;
}
