// import { applyMiddleware, legacy_createStore as createStore } from 'redux';
// import { thunk } from "redux-thunk";
// import persistedReducer from "./reducers/reducers";
// import { persistStore } from 'redux-persist';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zStorage } from './reducers/reducers';
const useBears = create(
  persist(
    (set, get) => ({
      bears: 0,
      increaseBreas: () => set((state: any) => ({ bears: state.bears + 1 })),
      removeAllBears: () => set({ bears: 0 }),
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => zStorage),
    },
  ),
);

export { useBears };
