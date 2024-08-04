import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { AuthModel, SocialType } from '../../modules/Auth/entities';
import { Typography } from '../../theme';
import { notifyMessage } from '../CustomToast/CustomToast';
import { FacebookIcon } from '../Icon';
import styles from './SocialLoginButton.style';

interface FBLoginButtonProps {
  onSuccess(socialToken: AuthModel.SocialToken): void;
}

const FbLoginButton: React.FC<FBLoginButtonProps> = ({ onSuccess }) => {
  const { t } = useTranslation(undefined, { keyPrefix: 'login' });
  const handleLogin = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      result => {
        if (!result.isCancelled) {
          AccessToken.getCurrentAccessToken().then(data => {
            console.log('🚀 ~ AccessToken.getCurrentAccessToken ~ data:', data);

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
      <Text style={Typography.textSmall}>Facebook</Text>
    </TouchableOpacity>
  );
};
export default FbLoginButton;
