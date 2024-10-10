import { api } from '../../../api';
import store from '../../../context/app/store';
import { AuthModel } from '../entities';
import { setToken, setUser } from '../slice/authSlice';

export const authBaseUrl = '/auth';

export function signUp(
  customer: AuthModel.RegisterRequest,
): Promise<AuthModel.RegisterResponse> {
  return api.post(`${authBaseUrl}/contractors/register`, customer);
}

export async function activate(
  otp: AuthModel.Otp,
): Promise<AuthModel.RegisterResponse> {
  let token: AuthModel.Token = await api.post(`${authBaseUrl}/activate`, otp);
  return await authenticate(token);
}

export async function tokenCredentials(
  credentials: AuthModel.UsernamePassword,
): Promise<AuthModel.RegisterResponse> {
  let token: AuthModel.Token = await api.post(
    `${authBaseUrl}/token`,
    credentials,
  );

  return await authenticate(token);
}

export async function tokenOtp(
  otp: AuthModel.Otp,
): Promise<AuthModel.RegisterResponse> {
  let token: AuthModel.Token = await api.post(`${authBaseUrl}/token/otp`, otp);
  return await authenticate(token);
}

export function createPin(
  pin: AuthModel.CreatePin,
): Promise<AuthModel.RegisterResponse> {
  return api.post(`${authBaseUrl}/pin`, pin);
}

export function updatePin(
  pin: AuthModel.UpdatePin,
): Promise<AuthModel.RegisterResponse> {
  return api.put(`${authBaseUrl}/pin`, pin);
}

export async function socialCustomerAuthenticate(
  socialToken: AuthModel.SocialToken,
): Promise<AuthModel.RegisterResponse> {
  let token: AuthModel.Token = await api.post(
    `${authBaseUrl}/contractors/social`,
    socialToken,
  );
  return await authenticate(token);
}

async function authenticate(
  token: AuthModel.Token,
): Promise<AuthModel.RegisterResponse> {
  store.dispatch(setToken(token));

  let user: AuthModel.RegisterResponse = await introspect();

  store.dispatch(setUser(user));

  return user;
}

export function introspect(): Promise<AuthModel.RegisterResponse> {
  return api.get(`${authBaseUrl}/introspect`);
}

export function sendOtp(credentials: AuthModel.Credentials) {
  return api.post('/otp/send', credentials);
}
