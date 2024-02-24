import { api } from '../..';

function getRequests(): Promise<any[]> {
  return api.get('api/requests');
}

export const requestsService = {
  getRequests,
};
