import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../context/app/store';
import { AuthModel } from '../entities';

export interface AuthState {
  isAuthenticated: boolean;
  token?: AuthModel.Token;
  user?: AuthModel.User;
  firebaseToken?: string;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    token: undefined,
    user: undefined,
  } as AuthState,
  reducers: {
    setToken: (state, action: PayloadAction<AuthModel.Token>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    setUser: (state, action: PayloadAction<AuthModel.User>) => {
      state.user = action.payload;
    },
    resetAuth: state => {
      state.isAuthenticated = false;
      state.token = undefined;
      state.user = undefined;
    },
    setFirebaseToken: (state, action: PayloadAction<string>) => {
      state.firebaseToken = action.payload;
    },
  },
});

export const { setToken, setUser, resetAuth, setFirebaseToken } = authSlice.actions;
export default authSlice.reducer;

export const selectAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const selectUser = (state: RootState) => state.auth.user;
export const selectFirebaseToken = (state: RootState) => state.auth.firebaseToken;

export const selectToken = (state: RootState) => state.auth.token;

export const hasPin = (state: RootState) => state.auth.user?.hasPin;
