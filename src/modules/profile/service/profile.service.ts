import { api } from '../../../api';
import store from '../../../context/app/store';
import { AuthModel } from '../../Auth/entities';
import { setUser } from '../../Auth/slice/authSlice';
import { ProfileModel } from '../entities/profile.model';
import { Schema } from '../model/registration.model';

export async function patchInformation(form: Schema): Promise<AuthModel.User> {
  return new Promise(async (resolve, reject) => {
    try {
      const user: AuthModel.User = await api.patch('/contractors', form);
      store.dispatch(setUser(user));
      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
}
export function getUserInformation(id: number): Promise<ProfileModel.User> {
  return api.get(`/users/${id}`);
}
