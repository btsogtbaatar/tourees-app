import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import moment from 'moment';
import { BehaviorSubject, filter, take } from 'rxjs';
import { AuthAction } from '../../context/auth/store';
import {
  AuthState,
  ClientTokenResponse,
} from '../../context/entities/auth.model';
import { authService } from './auth/auth.service';

const tokenSubject = new BehaviorSubject<any>(null);
export const axiosInstance = (api: AxiosInstance, store: any) => {
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig<any>) => {
      const state: AuthState & AuthAction = store.getState();
      const access_token = state.auth?.token;

      if (config.headers) {
        if (state.authenticated && access_token) {
          config.headers['Authorization'] = `Bearer ${access_token}`;
        } else if (
          config.url !== '/oauth/token' &&
          !state.authenticated &&
          state.clientToken &&
          new Date(state?.clientToken?.access_token_expires) >= new Date()
        ) {
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
      const state: AuthState & AuthAction = store.getState();
      const _error = error.response?.data;
      if (
        error.response === undefined ||
        (error.response && error.response.data === undefined)
      ) {
        return Promise.reject();
      }
      if (error.response.status === 401) {
        tokenSubject.next(null);
        authService
          .getClientCredentialToken()
          .then((res: ClientTokenResponse) => {
            const access_token_date: Date = moment(new Date())
              .add(Number(res.expires_in), 'seconds')
              .toDate();
            res.access_token_expires = access_token_date;
            state.setClentToken(res);
            tokenSubject.next({ token: res.access_token, error: undefined });
          });
        return new Promise((resolve, reject) => {
          tokenSubject
            .pipe(
              filter((x: any) => x != null),
              take(1),
            )
            .subscribe((request: any) => {
              if (request.token !== undefined) {
                error.config?.headers.set(
                  'Authorization',
                  `Bearer ${request.token}`,
                );
                api(error.config)
                  .then((resp: any) => {
                    resolve(resp);
                  })
                  .catch((_error: any) => {
                    reject(_error);
                  });
              }
            });
        });
      }
      return Promise.reject(_error);
    },
  );
};
