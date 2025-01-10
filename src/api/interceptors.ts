import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { reset } from '../../App';
import i18n from '../../i18n';
import store from '../context/app/store';
import { AuthState, logout } from '../modules/Auth/slice/authSlice';
import { SharedModel } from '../modules/Shared/entities/shared.model';
import { toastError } from '../utilities/toast';

export const axiosInstance = (api: AxiosInstance) => {
  api.interceptors.request.use(config => {
    const state: AuthState = store.getState().auth;

    if (state.isAuthenticated) {
      config.headers.Authorization = `Bearer ${state.token?.jwt}`;
    }

    return config;
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => {
      return response.data;
    },
    (error: AxiosError<SharedModel.ToureesError>) => {
      if (
        error.response?.status === 403 &&
        error.response.data.code === 'TI005'
      ) {
        if (store.getState().auth.isAuthenticated) {
          store.dispatch(logout());
          toastError(i18n.t('tokenExpiredError'));
          reset('Login');
        }
      } else if (error.response?.data) {
        toastError(error.response.data.message);
      }

      return Promise.reject(new Error(error.response?.data.message));
    },
  );
};
