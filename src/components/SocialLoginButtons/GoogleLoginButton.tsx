import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './SocialLoginButton.style';

import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useTranslation } from 'react-i18next';
import { AuthModel, SocialType } from '../../modules/Auth/entities';
import { Typography } from '../../theme';
import { toastError } from '../../utilities/toast';
import { GoogleIcon } from '../Icon';

interface GoogleLoginButtonProps {
  onSuccess(socialToken: AuthModel.SocialToken): void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onSuccess }) => {
  const { t } = useTranslation(undefined, { keyPrefix: 'login' });
  const handleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      onSuccess({
        token: userInfo.serverAuthCode!,
        type: SocialType.GOOGLE,
      });
    } catch (error: any) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            toastError(
              t('socialError.waitPrevious'),
            );
            return;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            toastError(
              t('socialError.playServiceUnvailable'),
            );
            return;
          default:
            return;
        }
      }
      toastError(t('socialError.title'), error);
    }
  };

  return (
    <TouchableOpacity onPress={handleLogin} style={styles.button}>
      <GoogleIcon style={styles.icon} />
      <Text style={Typography.textSmall}>Google</Text>
    </TouchableOpacity>
  );
};
export default GoogleLoginButton;
