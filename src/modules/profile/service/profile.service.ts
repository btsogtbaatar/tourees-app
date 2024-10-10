import { api } from '../../../api';
import store from '../../../context/app/store';
import { AuthModel } from '../../Auth/entities';
import { setUser } from '../../Auth/slice/authSlice';
import { Schema } from '../model/registration.model';

export async function patchInformation(
  form: Schema,
): Promise<AuthModel.RegisterResponse> {
  return new Promise(async (resolve, reject) => {
    try {
      const user: AuthModel.RegisterResponse = await api.patch(
        '/contractors',
        form,
      );
      store.dispatch(setUser(user));
      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
}
