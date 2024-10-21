import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../context/app/store';

interface PreferenceState {
  language: string;
  biometricEnabled?: boolean;
  dontShowBiometricConsent?: boolean;
}

const preference = createSlice({
  name: 'preference',
  initialState: {
    language: 'mn',
    dontShowBiometricConsent: false
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
    setBiometricDontShowAgain: (state, action: PayloadAction<boolean>) => {
      state.dontShowBiometricConsent = action.payload;
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
  setBiometricDontShowAgain,
  resetPreference,
} = preference.actions;
export default preference.reducer;
export const selectLanguage = (state: RootState) => state.preference.language;
export const selectBiometricEnabled = (state: RootState) =>
  state.preference?.biometricEnabled;
export const selectDontShowBiometricConsent = (state: RootState) =>
  state.preference?.dontShowBiometricConsent;
