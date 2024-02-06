import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { zStorage } from '../reducers/reducers';
import {
  AuthState,
  AuthStateToken,
  ClientTokenResponse,
} from '../entities/auth.model';

export type AuthAction = {
  setClentToken: (token: ClientTokenResponse) => void;
  clearClientToken: () => void;
  setAccessToken: (token: AuthStateToken, authenticated: boolean) => void;
  clearAccessToken: () => void;
  setAuthentication: (auth: boolean) => void;
};

const authStore = create<AuthState & AuthAction>()(
  persist(
    (set, get) => ({
      authenticated: false,
      auth: undefined,
      clientToken: undefined,
      setClentToken: token =>
        set(state => ({
          clientToken: token,
          authentication: false,
          auth: undefined,
        })),
      clearClientToken() {
        set({ clientToken: undefined });
      },
      setAccessToken: (token, authincation) =>
        set(state => ({
          auth: token,
          authenticated: authincation,
        })),
      clearAccessToken: () => set({ auth: undefined, authenticated: false }),
      setAuthentication(auth) {
        set({ authenticated: auth });
      },
    }),
    { name: 'auth-store', storage: createJSONStorage(() => zStorage) },
  ),
);

export { authStore };
