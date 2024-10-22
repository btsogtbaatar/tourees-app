import { api } from '../../../api';
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

export function getMyTasks(
  page: number = 1,
  size = 10,
): Promise<SharedModel.Pagination<TaskModel.TaskResponse>> {
  const params = {
    page: page - 1,
    size: size,
  };
  return api.get('/tasks/created/', { params: params });
}

export function createOffer(
  offer: TaskModel.CreateOffer,
): Promise<TaskModel.OfferResponse> {
  return api.post('/offers', offer);
}

export function getTask(id: number): Promise<TaskModel.TaskResponse> {
  return api.get(`/tasks/${id}`);
}

export async function getLastTaskFromAddress(): Promise<
  TaskModel.Address | undefined
> {
  let page = await getTasks(1, 1);

  if (
    page.content.length > 0 &&
    page.content[0].addresses !== undefined &&
    page.content[0].addresses.length > 0
  ) {
    return page.content[0].addresses.find(_address => _address.name === 'from');
  }

  return undefined;
}
export function createTask(task: TaskModel.TaskRequest) {
  return api.post('/tasks', task);
}
