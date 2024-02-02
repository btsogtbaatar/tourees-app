import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { zStorage } from '../reducers/reducers';
import { AuthState, ClientTokenResponse } from '../entities/auth.model';

interface Token {
  accessToken: string;
  refreshToken?: string;
  accessTokenDate: Date;
}

type Store = {
  clientToken?: Token;
  authentication?: boolean;
  auth?: Token;
};

export type AuthAction = {
  setClentToken: (token: ClientTokenResponse) => void;
  clearClientToken: () => void;
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
      clearClientToken: () => set({ clientToken: undefined }),
    }),
    { name: 'auth-store', storage: createJSONStorage(() => zStorage) },
  ),
);

export { authStore };
