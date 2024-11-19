import { api } from '../../../api';
import store from '../../../context/app/store';
import { AuthModel } from '../entities';
import { setProfileImage, setToken, setUser } from '../slice/authSlice';

export const authBaseUrl = '/auth';

export function signUp(
  customer: AuthModel.RegisterRequest,
): Promise<AuthModel.User> {
  return api.post(`${authBaseUrl}/contractors/register`, customer);
}

export async function activate(otp: AuthModel.Otp): Promise<AuthModel.User> {
  let token: AuthModel.Token = await api.post(`${authBaseUrl}/activate`, otp);
  return await authenticate(token);
}

export async function tokenCredentials(
  credentials: AuthModel.UsernamePassword,
): Promise<AuthModel.User> {
  let token: AuthModel.Token = await api.post(
    `${authBaseUrl}/token`,
    credentials,
  );

  return await authenticate(token);
}

export async function tokenOtp(otp: AuthModel.Otp): Promise<AuthModel.User> {
  let token: AuthModel.Token = await api.post(`${authBaseUrl}/token/otp`, otp);
  return await authenticate(token);
}

export function createPin(pin: AuthModel.CreatePin): Promise<AuthModel.User> {
  return api.post(`${authBaseUrl}/pin`, pin);
}

export function updatePin(pin: AuthModel.UpdatePin): Promise<AuthModel.User> {
  return api.put(`${authBaseUrl}/pin`, pin);
}
function socialAuthenticate(
  socialToken: AuthModel.SocialToken,
): Promise<AuthModel.Token> {
  return api.post(`${authBaseUrl}/contractors/social`, {
    token: socialToken.token,
    type: socialToken.type,
  });
}

export async function socialCustomerAuthenticate(
  socialToken: AuthModel.SocialToken,
): Promise<AuthModel.User> {
  let token: AuthModel.Token = await socialAuthenticate(socialToken);
  console.log('Token resp:', token);
  return await authenticate(token);
}

async function authenticate(token: AuthModel.Token): Promise<AuthModel.User> {
  store.dispatch(setToken(token));

  let user: AuthModel.User = await introspect();

  store.dispatch(setUser(user));
  if (user.contractor && user.contractor?.profilePicture)
    store.dispatch(setProfileImage(user.contractor.profilePicture));
  return user;
}

export function updateFirebaseToken(token: string) {
  return api.put(`${authBaseUrl}/firebase/token`, { token });
}

export function introspect(): Promise<AuthModel.User> {
  return api.get(`${authBaseUrl}/introspect`);
}

export function sendOtp(credentials: AuthModel.Credentials) {
  return api.post('/otp/send', credentials);
}
