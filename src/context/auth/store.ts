import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { zStorage } from '../reducers/reducers';
import {
  AuthState,
  AuthStateToken,
  ClientTokenResponse,
  LanguageState,
} from '../entities/auth.model';

export type AuthAction = {
  setClentToken: (token: ClientTokenResponse) => void;
  clearClientToken: () => void;
  setAccessToken: (token: AuthStateToken, authenticated: boolean) => void;
  clearAccessToken: () => void;
  setAuthentication: (auth: boolean) => void;
};

export type LanguageAction = {
  setLanguage: (language: 'mn' | 'en' | 'chn') => void;
};

const languageStore = create<LanguageState & LanguageAction>()(
  persist(
    set => ({
      language: 'mn',
      setLanguage(language) {
        set({ language: language });
      },
    }),
    {
      name: 'language-store',
      storage: createJSONStorage(() => zStorage),
    },
  ),
);

const authStore = create<AuthState & AuthAction>()(
  persist(
    set => ({
      authenticated: false,
      auth: undefined,
      clientToken: undefined,
      setClentToken: token =>
        set({
          clientToken: token,
          authenticated: false,
          auth: undefined,
        }),
      clearClientToken() {
        set({ clientToken: undefined });
      },
      setAccessToken: (token, authincation) =>
        set({
          auth: token,
          authenticated: authincation,
        }),
      clearAccessToken: () => set({ auth: undefined, authenticated: false }),
      setAuthentication(auth) {
        set({ authenticated: auth });
      },
    }),
    { name: 'auth-store', storage: createJSONStorage(() => zStorage) },
  ),
);

export { authStore, languageStore };
