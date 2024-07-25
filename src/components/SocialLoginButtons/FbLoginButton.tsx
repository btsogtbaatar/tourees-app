import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { FacebookIcon } from '../../assets/svg';
import styles from './SocialLoginButton.style';
import { AuthModel, SocialType } from '../../modules/Auth/entities';
import { useTranslation } from 'react-i18next';
import { notifyMessage } from '../CustomToast/CustomToast';
import { Typography } from '../../constants';

interface GoogleLoginButtonProps {
  onSuccess(socialToken: AuthModel.SocialToken): void;
}

const FbLoginButton: React.FC<GoogleLoginButtonProps> = ({ onSuccess }) => {
  const { t } = useTranslation(undefined, { keyPrefix: 'login' });
  const handleLogin = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      result => {
        if (!result.isCancelled) {
          AccessToken.getCurrentAccessToken().then(data => {
            if (data) {
              onSuccess({
                token: data.accessToken,
                type: SocialType.FACEBOOK,
              });
            }
          });
        }
      },
      error => {
        notifyMessage(t('socialError.title'), error);
      },
    );
  };

  return (
    <TouchableOpacity onPress={handleLogin} style={styles.button}>
      <FacebookIcon style={styles.icon} />
      <Text style={Typography.textSmallBold}>Facebook</Text>
    </TouchableOpacity>
  );
};
export default FbLoginButton;
