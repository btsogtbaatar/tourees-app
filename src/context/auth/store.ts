import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { zStorage } from '../reducers/reducers';

type Store = {
  token: string;
};

type AuthAction = {
  setToken: (token: string) => void;
  clearToken: () => void;
  //   accesstoken?: string;
  //   tokenType?: string;
  //   expiresIn?: number;

  //   actions: {
  //     setAccessToken: (accessToken?: string) => void;
  //     clearToken: () => void;
  //   };
};

const authStore = create<Store & AuthAction>()(
  persist(
    set => ({
      token: '',
      setToken: token => set(state => ({ token: token })),
      clearToken: () => set({ token: '' }),
    }),
    { name: 'auth-store', storage: createJSONStorage(() => zStorage) },
  ),
);

export { authStore };
