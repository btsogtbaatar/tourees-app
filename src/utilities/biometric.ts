import {
  ACCESS_CONTROL,
  ACCESSIBLE,
  AUTHENTICATION_TYPE,
  getGenericPassword,
  getSupportedBiometryType,
  setGenericPassword,
  STORAGE_TYPE,
} from 'react-native-keychain';

const serviceName = 'tourees';

// Store credentials with biometric protection
export async function storeCredentials(username: string, password: string) {
  // Check biometric availability
  const biometryType = await getSupportedBiometryType();

  // Handle biometric requirement
  if (!biometryType) {
    throw new Error('Biometric authentication is required but not available');
  }

  await setGenericPassword(username, password, {
    service: serviceName,
    accessControl: ACCESS_CONTROL.DEVICE_PASSCODE,
    accessible: ACCESSIBLE.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY,
    storage: STORAGE_TYPE.RSA,
    authenticationType: AUTHENTICATION_TYPE.BIOMETRICS,
  });
}

export type KeychainError = {
  message: string;
};

// Retrieve credentials (will trigger biometric prompt)
export async function retrieveCredentials() {
  const credentials = await getGenericPassword({
    service: serviceName,
  });

  if (!credentials) {
    throw new Error('Credentials are null.');
  }

  return credentials;
}
