import { SharedModel } from '../../Shared/entities/shared.model';

export declare namespace ProfileModel {
  export interface ProfilePicture {
    profilePicture?: SharedModel.File;
  }
  export interface User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    phone: string;
    email: string;
    profile: SharedModel.File;
  }
}
