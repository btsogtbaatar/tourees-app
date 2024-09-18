import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../context/app/store';

interface PreferenceState {
  language: string;
  biometricEnabled?: boolean;
}

const preference = createSlice({
  name: 'preference',
  initialState: {
    language: 'mn',
  } as PreferenceState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    enableBiometric: state => {
      state.biometricEnabled = true;
    },
    disableBiometric: state => {
      state.biometricEnabled = false;
    },
    resetPreference: state => {
      state.language = 'mn';
      state.biometricEnabled = undefined;
    },
  },
});

export const {
  changeLanguage,
  enableBiometric,
  disableBiometric,
  resetPreference,
} = preference.actions;
export default preference.reducer;
export const selectLanguage = (state: RootState) => state.preference.language;
export const selectBiometricEnabled = (state: RootState) =>
  state.preference?.biometricEnabled;
