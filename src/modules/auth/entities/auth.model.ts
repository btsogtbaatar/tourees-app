import { SharedModel, TaskerType } from '../../Shared/entities/shared.model';

export enum AuthChannel {
  Email = 0,
  Phone = 1,
}

export declare module AuthModel {
  export type RegisterRequest = {
    email?: string;
    phoneNumber?: PhoneNumber;
    username: string;
  };
  export type Contractor = {
    address?: string;
    profilePicture?: SharedModel.File;
    type?: TaskerType;
  };
  export type UpdatePin = {
    oldPin: string;
    newPin: string;
  };
  export type CreatePin = {
    newPin: string;
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

  export type UsernamePassword = {
    username: string;
    password: string;
  };
  export type PhoneNumber = {
    countryCode?: string;
    lineNumber?: string;
  };
  export type Credentials = {
    email?: string;
    phoneNumber?: PhoneNumber;
  };

  export class User {
    id?: number;
    email?: string;
    phoneNumber?: PhoneNumber;
    username: string;
    firstName?: string;
    lastName?: string;
    profilePicture?: SharedModel.File;
    hasPin: boolean;
    biometricEnabled?: boolean;
    contractor?: Contractor;
  }
}
export enum SocialType {
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
}

export interface ProfileState {
  picture: string;
  setPicture: (value?: string) => void;
  clearPicture: () => void;
}
