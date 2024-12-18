import { Client } from '@stomp/stompjs';
import { api, getEnv } from '../../../api';
import { ImageSource } from '../../../components/ImageUploadButton/ImageUploadButton';
import { SharedModel } from '../entities/shared.model';
import store from '../../../context/app/store';
import { TaskModel } from '../../Request/entities/request.model';
import { number } from 'yup';

export function uploadFile(file: any): Promise<SharedModel.File> {
  const formData = new FormData();
  formData.append('file', file);
  return api.post('/file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function uploadFiles(files: ImageSource[]): Promise<SharedModel.File[]> {
  const formData = new FormData();
  let isRequest: boolean = false;
  files.forEach(file => {
    if (file.uri) {
      isRequest = true;
      formData.append('files', {
        uri: file.uri,
        type: file.type,
        name: file.name || 'photo.jpg',
      });
    }
  });
  if (isRequest) {
    return api.post('/file/uploads', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  return Promise.resolve([]);
}
export function getConversationId(
  id: number,
): Promise<SharedModel.ConversationID> {
  console.log('id', id);
  return api.get(`/conversation/user/${id}`);
}
