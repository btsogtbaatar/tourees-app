import { api } from '../../../api';
import { AuthStateToken } from '../../Auth/entities';
import { TaskerService} from '../entities/request.model';


export function createTaskerService(
  taskerService: TaskerService,
): Promise<AuthStateToken> {
  return api.post('/tasker/service', taskerService);
}
