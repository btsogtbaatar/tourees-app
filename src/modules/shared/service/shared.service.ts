import { api } from '../../../api';
import { SharedModel } from '../entities/shared.model';

export function uploadFile(file: any): Promise<SharedModel.File> {
  const formData = new FormData();
  formData.append('file', file);
  return api.post('/file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
