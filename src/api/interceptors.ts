import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import store from '../context/app/store';
import { AuthState } from '../modules/Auth/slice/authSlice';

export const axiosInstance = (api: AxiosInstance) => {
  api.interceptors.request.use(
    config => {
      const state: AuthState = store.getState().auth;

      if (state.isAuthenticated) {
        config.headers.Authorization = `Bearer ${state.token?.jwt}`;
      }

      return config;
    },
    (error: AxiosError<any>) => {
      return Promise.reject(error.response?.data);
    },
  );

  api.interceptors.response.use(
    (response: AxiosResponse) => {
      return response.data;
    },
    (error: AxiosError<any>) => {
      return Promise.reject(error.response?.data);
    },
  );
};
