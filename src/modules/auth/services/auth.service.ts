import { api } from '../../../api';
import { authStore, profileStore } from '../../../context/auth/store';
import { AuthModel, AuthStateToken } from '../entities';

export const authBaseUrl = '/auth';

export function signUp(
  customer: AuthModel.RegisterRequest,
): Promise<AuthModel.RegisterResponse> {
  return api.post(`${authBaseUrl}/customers/register`, customer);
}

export async function activate(otp: AuthModel.Otp): Promise<AuthStateToken> {
  let token: AuthModel.Token = await api.post(`${authBaseUrl}/activate`, otp);
  let user: AuthModel.RegisterResponse = await authenticate(token.jwt);

  return { token: token.jwt, user };
}

export async function token(otp: AuthModel.Otp): Promise<AuthStateToken> {
  let token: AuthModel.Token = await api.post(`${authBaseUrl}/token/otp`, otp);
  let user: AuthModel.RegisterResponse = await authenticate(token.jwt);

  return { token: token.jwt, user };
}

export async function socialCustomerAuthenticate(
  socialToken: AuthModel.SocialToken,
): Promise<AuthStateToken> {
  let token: AuthModel.Token = await api.post(
    `${authBaseUrl}/customers/social`,
    socialToken,
  );
  let user: AuthModel.RegisterResponse = await authenticate(token.jwt);
  return { token: token.jwt, user };
}

// TODO: Refactor
async function authenticate(
  token: string,
): Promise<AuthModel.RegisterResponse> {
  authStore.getState().setAuthentication(true);
  authStore.getState().setAccessToken({ token: token }, true);

  let user: AuthModel.RegisterResponse = await introspect();
  console.log('🚀 ~ user:', user);
  if (user.profilePicture) {
    profileStore.getState().setPicture(user.profilePicture.url);
  }
  authStore.getState().setAccessToken({ token: token, user }, true);
  return user;
}

export async function introspect(): Promise<AuthModel.RegisterResponse> {
  return api.get(`${authBaseUrl}/introspect`);
}

export function sendOtp(credentials: AuthModel.Credentials) {
  return api.post('/otp/send', credentials);
}

export function logout() {}
