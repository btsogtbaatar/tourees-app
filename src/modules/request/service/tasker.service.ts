import { api } from '../../../api';
import { SharedModel } from '../../Shared/entities/shared.model';
import { ServiceTag, TaskerServiceModel } from '../entities/request.model';

export function createTaskerService(payload: TaskerServiceModel) {
  return api.post('/tasker/service', payload);
}
export function getTags(): Promise<ServiceTag[]> {
  return api.get('/tasker/service/tag');
}

export function fetchTaskerServices(
  filter?: SharedModel.TaskerServiceFilter,
  page = 0,
  size = 100,
): Promise<SharedModel.Pagination<SharedModel.TaskerServiceModel>> {
  const params = {
    page,
    size,
    subCategoryId: filter?.subCategoryId,
    name: filter?.name,
    country: filter?.country,
  };
  return api.get('/tasker/service', { params });
}

export function fetchCreatedTaskerServices(): Promise<
  SharedModel.TaskerServiceModel[]
> {
  return api.get('/tasker/service/created/');
}
export function getTaskerServiceDetail(
  id: number,
): Promise<SharedModel.TaskerServiceModel> {
  return api.get(`/tasker/service/${id}`);
}
