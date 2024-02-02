import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { BehaviorSubject } from 'rxjs';
import { AuthAction } from '../../context/auth/store';
import { AuthState } from '../../context/entities/auth.model';

const tokenSubject = new BehaviorSubject<any>(null);
export const axiosInstance = (api: AxiosInstance, store: any) => {
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig<any>) => {
      const state: AuthState & AuthAction = store.getState();
      const access_token = state.auth?.access_token;

      if (config.headers) {
        if (state.authenticated && access_token) {
          config.headers['Authorization'] = `Bearer ${access_token}`;
        } else if (!state.authenticated && state.clientToken) {
          config.headers[
            'Authorization'
          ] = `Bearer ${state.clientToken.access_token}`;
        }
        config.headers['Accep-Language'] = 'mn-MN';
      }
      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    },
  );

  api.interceptors.response.use(
    (response: AxiosResponse) => {
      return response.data;
    },
    (error: AxiosError<any>) => {
      if (
        error.response === undefined ||
        (error.response && error.response.data === undefined)
      ) {
        return Promise.reject();
      }
      if (error.response.status === 401) {
        tokenSubject.next(null);
        // authService.getClientCredentialToken().then((res: any) => {
        //   store.dispatch(authAction.updateCCToken(res));
        //   tokenSubject.next({ token: res.access_token, error: undefined });
        // });
        return Promise.reject(error);
      }
      return Promise.reject(error);
    },
  );
};
