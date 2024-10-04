import { api } from '../../../api';
import { ProfileModel } from '../entities/profile.model';

export function createProfile(body: ProfileModel.ProfileRequest) {
  return api.post('/profile', body);
}

export function getProfile(): Promise<ProfileModel.ProfileRequest> {
  return api.get('/profile');
}

export function getTags(): Promise<ProfileModel.ProfileTag[]> {
  return api.get('/profile/tag');
}