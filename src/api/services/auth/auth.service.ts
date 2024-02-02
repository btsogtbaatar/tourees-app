import { api } from '../..';
import { ClientTokenResponse } from '../../../context/entities';
import {
  RegisterModule,
  UsernameResponse,
} from '../../../modules/Auth/entities';
import BaseEncryped from '../base64';

const basicAuth =
  'Basic ' +
  BaseEncryped.btoa('2' + ':' + 'MIRKmwRqpqP5z9dBJVSoYCMzPZpA1EgFLuxVaFrH');
function checkEmail(
  data: RegisterModule.RegisterStep,
): Promise<UsernameResponse[]> {
  return api.post(`api/check-email`, data);
}

function sendOtp(data: RegisterModule.RegisterType) {
  return api.post('api/generate-otp', data);
}

function checkOtp(data: any) {
  return api.post('api/check-otp', data);
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
};
