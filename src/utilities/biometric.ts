import { Platform } from 'react-native';
import {
  ACCESS_CONTROL,
  ACCESSIBLE,
  getGenericPassword,
  getSupportedBiometryType,
  setGenericPassword,
} from 'react-native-keychain';
import i18n from '../../i18n';

export async function storeCredentials(username: string, password: string) {
  const biometryType = await getSupportedBiometryType();

  if (!biometryType) {
    throw new Error(i18n.t('biometric.notSupported'));
  }

  try {
    await setGenericPassword(username, password, {
      accessControl: ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
      accessible: ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    });
  } catch (error) {
    throw new Error(i18n.t('pin.errorSaving'));
  }
}

export class KeychainError extends Error {
  code: number;
  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}

export async function retrieveCredentials() {
  let credentials = null;

  try {
    credentials = await getGenericPassword();
  } catch (error) {
    const keychainError = error as KeychainError;

    if (Platform.OS === 'ios') {
      if (keychainError.code != -128) {
        throw keychainError;
      }
    } else if (Platform.OS === 'android') {
      if (
        !keychainError.message.startsWith('code: 10') &&
        !keychainError.message.startsWith('code: 13')
      ) {
        throw keychainError;
      }
    } else {
      // Unsupported platform
      throw new Error(i18n.t('notSupportedPlatform'));
    }
  }

  return credentials;
}
