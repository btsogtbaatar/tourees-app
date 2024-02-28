import { AuthChannel } from '../../modules/Auth/Pages/Auth/Login/Login';
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

export declare namespace LoginModel {
  export interface Credentials {
    channel?: AuthChannel;
    email?: string;
    phone?: string;
  }

  export interface LoginRequest extends Credentials {
    otp: string;
  }
}
