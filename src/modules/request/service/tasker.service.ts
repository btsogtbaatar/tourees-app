import { api } from '../../../api';
import { TaskerServiceModel } from '../entities/request.model';

export function createTaskerService(
  taskerService: TaskerServiceModel,
): Promise<void> {
  return api.post('/tasker/service', taskerService);
}
