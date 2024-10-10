import { api } from '../../../api';
import { ProfileModel } from '../entities/profile.model';

export const profileBaseUrl = '/users';

export function uploadProfile(profile: ProfileModel.ProfilePicture) {
  return api.post(`${profileBaseUrl}/upload/profile`, profile);
}
