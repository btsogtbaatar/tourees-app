import { api } from '../../../api';
import { TaskerModel } from '../entities/tasker.model';

export function createTasker(body: TaskerModel.TaskerRequest) {
  return api.post('/tasker', body);
}

export function createTaskerFile(body: TaskerModel.TaskerRequest) {
  const formData = new FormData();
  formData.append('files', body.files);
  return api.post('/tasker/file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function getTaskerView(): Promise<TaskerModel.TaskerRequestProps> {
  return api.get('/tasker');
}
