import { ImageSource } from '../../../components/ImageUploadButton/ImageUploadButton';
import { SharedModel } from '../../Shared/entities/shared.model';

export declare namespace TaskerModel {
  export interface RemarkItem {
    id: string;
    label: string;
    show?: boolean;
  }

  export interface TaskerRequest {
    tag: string;
    description: string;
    education?: string[];
    specialities?: string[];
    languages?: string[];
    transportation?: string[];
    ranks?: string[];
    files?: ImageSource[] | SharedModel.File[];
  }

  export interface TaskerRequestProps {
    tag: string;
    description: string;
    education?: string[];
    specialities?: string[];
    languages?: string[];
    transportation?: string[];
    ranks?: string[];
    files?: SharedModel.File[];
  }

  export interface RemarkRequest {
    remark?: string;
  }
}
