import { api } from '../../../api';
import { AuthStateToken } from '../../auth/entities';
import { SharedModel } from '../../shared/entities/shared.model';
import { TaskModel } from '../entities/request.model';

export function getTasks(
  page: number,
): Promise<SharedModel.Pagination<TaskModel.TaskResponse>> {
  const params = {
    page: page - 1,
    size: 10,
  };
  return api.get('/tasks', { params: params });
}

export function createTask(
  task: TaskModel.TaskRequest,
): Promise<AuthStateToken> {
  return api.post('/tasks', task);
}
