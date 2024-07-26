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
  user?: AuthModel.RegisterResponse;
}

export enum AuthChannel {
  Email = 0,
  Phone = 1,
}

export declare module AuthModel {
  export type RegisterRequest = {
    email?: string;
    phoneNumber?: string;
    username: string;
  };

  export type Otp = {
    email?: string;
    phoneNumber?: string;
    value: string;
  };
  export type SocialToken = {
    token: string;
    type: SocialType;
  };
  export type Token = {
    jwt: string;
  };

  export type Credentials = {
    email?: string;
    phoneNumber?: string;
  };

  export class RegisterResponse {
    id?: number;
    email?: string;
    phoneNumber?: string;
    username: string;
    firstName?: string;
    lastName?: string;

    constructor(username: string) {
      this.username = username;
    }

    get fullName() {
      return `${this.firstName} ${this.lastName}`;
    }
  }
}
export enum SocialType {
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
}
