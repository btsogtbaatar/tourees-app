import { api } from '../..';
import { AuthStateToken } from '../../../context/entities/auth.model';
import { RequestModule } from '../../../modules/Auth/entities';

const headers = {
  'Content-Type': 'multipart/form-data',
};
function getRequests(): Promise<any[]> {
  return api.get('api/requests');
}

function createRequest(data: RequestModule.Request): Promise<AuthStateToken> {
  data.is_app = true;
  return api.post('/requests', data, {headers});
}

export const requestsService = {
  getRequests,
  createRequest,
};
