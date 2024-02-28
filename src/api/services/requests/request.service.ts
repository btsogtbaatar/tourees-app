import { api } from '../..';
import { AuthStateToken } from '../../../context/entities/auth.model';
import { RequestModule } from '../../../context/entities/request.model';

const headers = {
  'Content-Type': 'multipart/form-data',
};
function getRequests(page: number): Promise<any> {
  const params = {
    page: page,
  };
  return api.get('api/requests', { params: params });
}

function createRequest(data: RequestModule.Request): Promise<AuthStateToken> {
  data.is_app = true;
  return api.post('/requests', data, { headers });
}

export const requestsService = {
  getRequests,
  createRequest,
};
