import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { FacebookIcon } from '../../assets/svg';
import styles from './SocialLoginButton.style';
import { AuthModel } from '../../modules/Auth/entities';

interface GoogleLoginButtonProps {
  onSuccess(socialToken: AuthModel.SocialToken): void;
}

const FbLoginButton: React.FC<GoogleLoginButtonProps> = ({ onSuccess }) => {
  const handleLogin = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      result => {
        if (!result.isCancelled) {
          AccessToken.getCurrentAccessToken().then(data => {
            console.log(data);
            if (data) {
              onSuccess({ token: data.accessToken, type: 'FACEBOOK' });
            }
          });
        }
      },
      error => {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  return (
    <TouchableOpacity onPress={handleLogin} style={styles.button}>
      <FacebookIcon style={styles.icon} />
      <Text style={styles.text}>Facebook</Text>
    </TouchableOpacity>
  );
};
export default FbLoginButton;
