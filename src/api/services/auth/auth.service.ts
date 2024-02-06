import { api } from '../..';
import { AuthStateToken, ClientTokenResponse } from '../../../context/entities';
import {
  RegisterModule,
  UsernameResponse,
} from '../../../modules/Auth/entities';
import BaseEncryped from '../base64';

const basicAuth =
  'Basic ' +
  BaseEncryped.btoa('2' + ':' + '21gRM7sXSj9RFdsZ9bkhuwvFwDSUxWPVwnJ1ZSEC');
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
  checkEmail,
  getClientCredentialToken,
  sendOtp,
  checkOtp,
  updateTerms,
  logout,
};
