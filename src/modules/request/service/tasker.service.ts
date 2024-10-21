import { api } from '../../../api';
import { ServiceTag, TaskerServiceModel} from '../entities/request.model';


export function createTaskerService(
  payload: TaskerServiceModel,
) {
  return api.post('/tasker/service', payload);
}
export function getTags(): Promise<ServiceTag[]> {
  return api.get('/tasker/service/tag');
}
