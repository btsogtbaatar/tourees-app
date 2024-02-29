import { api } from '../..';
import {
  AuthStateToken,
  ClientTokenResponse,
  LoginModel,
} from '../../../context/entities';
import { AuthChannel } from '../../../modules/Auth/Pages/Auth/Login/Login';
import {
  RegisterModule,
  UsernameResponse,
} from '../../../modules/Auth/entities';
import BaseEncryped from '../base64';

const basicAuth =
  'Basic ' +
  BaseEncryped.btoa(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET);
function checkEmail(
  data: RegisterModule.RegisterStep,
): Promise<UsernameResponse[]> {
  return api.post(`api/generate-username`, data);
}

function sendOtp(data: RegisterModule.RegisterType) {
  return api.post('api/generate-otp', data);
}

function checkOtp(data: RegisterModule.RegisterType): Promise<AuthStateToken> {
  return api.post('api/check-otp', data);
}

function updateTerms(data: { id: number; username: string }) {
  return api.post('api/update/term', data);
}

function logout() {
  return api.post('api/logout');
}

function generateOtpLogin(credentials: LoginModel.Credentials) {
  let channel = 'email';

  if (credentials.channel === AuthChannel.Phone) {
    channel = 'phone';
  }

  return api.post('api/app/generate-login-otp', { ...credentials, channel });
}

function login(data: LoginModel.LoginRequest): Promise<AuthStateToken> {
  let channel = 'email';

  if (data.channel === AuthChannel.Phone) {
    channel = 'phone';
  }

  return api.post('api/app/login', { ...data, channel });
}

function getClientCredentialToken(): Promise<ClientTokenResponse> {
  const params = {
    grant_type: 'client_credentials',
    scope: '*',
  };
  return api.post(
    '/oauth/token',
    {
      grant_type: 'client_credentials',
      scope: '*',
    },
    {
      params: params,
      headers: {
        Authorization: basicAuth,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
}

export const authService = {
  login,
  generateOtpLogin,
  checkEmail,
  getClientCredentialToken,
  sendOtp,
  checkOtp,
  updateTerms,
  logout,
};
