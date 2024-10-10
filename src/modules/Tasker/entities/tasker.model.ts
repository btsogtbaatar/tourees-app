import { ImageSource } from '../../../components/ImageUploadButton/ImageUploadButton';
import { SharedModel } from '../../Shared/entities/shared.model';

export declare namespace TaskerModel {
  export interface RemarkItem {
    id: string;
    label: string;
    show?: boolean;
  }

  export interface TaskerProfileProps {
    tag: string;
    description: string;
    education?: string[];
    specialities?: string[];
    languages?: string[];
    ranks?: string[];
    files?: SharedModel.File[];
  }

  export interface RemarkRequest {
    remark?: string;
  }
}
