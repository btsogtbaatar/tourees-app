import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../context/app/store';
import { SharedModel } from '../../Shared/entities/shared.model';
import { AuthModel } from '../entities';

export interface AuthState {
  isAuthenticated: boolean;
  token?: AuthModel.Token;
  user?: AuthModel.User;
  firebaseToken?: string;
  profile?: SharedModel.File;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    token: undefined,
    user: undefined,
    profile: undefined,
  } as AuthState,
  reducers: {
    setToken: (state, action: PayloadAction<AuthModel.Token>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    setUser: (state, action: PayloadAction<AuthModel.User>) => {
      state.user = action.payload;
    },
    setProfileImage: (state, action: PayloadAction<SharedModel.File>) => {
      state.profile = action.payload;
    },
    setHasPin: (state, action: PayloadAction<boolean>) => {
      state.user!.hasPin = action.payload;
    },
    logout: state => {
      state.isAuthenticated = false;
      state.token = undefined;
      state.user = undefined;
      state.profile = undefined;
    },
  },
});

export const {
  setToken,
  setUser,
  setHasPin,
  logout,
  setProfileImage,
} = authSlice.actions;
export default authSlice.reducer;

export const selectAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const selectUser = (state: RootState) => state.auth.user;
export const selectFirebaseToken = (state: RootState) =>
  state.auth.firebaseToken;

export const selectToken = (state: RootState) => state.auth.token;

export const hasPin = (state: RootState) => state.auth.user?.hasPin;
export const selectProfile = (state: RootState) => state.auth.profile;
