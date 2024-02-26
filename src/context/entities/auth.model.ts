import { RegisterModule } from './register.mode';

export interface AuthState {
  authenticated?: boolean;
  clientToken?: ClientTokenResponse;
  auth?: AuthStateToken;
}

export interface LanguageState {
  language: 'mn' | 'en' | 'chn';
}

export interface ClientTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  access_token_expires: Date;
}

export interface AuthStateToken {
  token: string;
  user: RegisterModule.User;
  checkExpired: false;
}
