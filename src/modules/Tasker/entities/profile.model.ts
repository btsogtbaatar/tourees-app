import { ImageSource } from '../../../components/ImageUploadButton/ImageUploadButton';
import { SharedModel } from '../../Shared/entities/shared.model';

export declare namespace ProfileModel {
  export interface ProfileRequest {
    tagLine: string;
    description: string;
    educations?: string[];
    specialities?: string[];
    languages?: string[];
    ranks?: string[];
    files?: SharedModel.File[];
    workingType?: string;
  }

  export interface ProfileTag {
    id: number;
    type: string;
    value: string;
  }
}
