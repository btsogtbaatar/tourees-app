import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { BehaviorSubject } from 'rxjs';
import { authService } from './auth';
import { authAction } from '../../context/actions/actions';
import { authStore } from '../../context/auth/store';

const tokenSubject = new BehaviorSubject<any>(null);
export const axiosInstance = (api: AxiosInstance) => {
  const token = authStore.getState().token;
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig<any>) => {
      console.log(token, 'tokennnnnn');

      // const { auth } = store.getState();
      // const access_token = auth?.access_token;
      // console.log(auth, 'auth');

      // if (config.headers) {
      //   if (auth.authenticated && access_token) {
      //     config.headers['Authorization'] = `Bearer ${access_token}`;
      //   } else if (!auth.authenticated && auth.clientToken) {
      //     config.headers[
      //       'Authorization'
      //     ] = `Bearer ${auth.clientToken.access_token}`;
      //   }
      config.headers['Accep-Language'] = 'mn-MN';
      // }
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
