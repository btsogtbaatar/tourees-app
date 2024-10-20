import { api } from '../../../api';
import { AuthStateToken } from '../../Auth/entities';
import { SharedModel } from '../../Shared/entities/shared.model';
import { TaskerService } from '../entities/request.model';

export function createTaskerService(
  taskerService: TaskerService,
): Promise<AuthStateToken> {
  return api.post('/tasker/service', taskerService);
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
  };
  return api.get('/tasker/service', { params });
}
export function getTaskerServiceDetail(
  id: number,
): Promise<SharedModel.TaskerServiceModel> {
  return api.get(`/tasker/service/${id}`);
}
