import { api } from '../../../api';
import { AuthStateToken } from '../../Auth/entities';
import { SharedModel } from '../../Shared/entities/shared.model';
import { TaskModel } from '../entities/request.model';

export function getTasks(
  page: number = 1,
  size = 10,
): Promise<SharedModel.Pagination<TaskModel.TaskResponse>> {
  const params = {
    page: page - 1,
    size: size,
  };
  return api.get('/tasks', { params: params });
}

export function createTask(
  task: TaskModel.TaskRequest,
): Promise<AuthStateToken> {
  return api.post('/tasks', task);
}
