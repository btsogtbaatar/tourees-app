import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { GoogleIcon } from '../../assets/svg';
import styles from './SocialLoginButton.style';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AuthModel } from '../../modules/Auth/entities';

interface GoogleLoginButtonProps {
  onSuccess(socialToken: AuthModel.SocialToken): void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onSuccess }) => {
  const handleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      onSuccess({ token: userInfo.serverAuthCode!, type: 'GOOGLE' });
    } catch (error) {
      console.log('Google sign in failed detail ', error);
    }
  };

  return (
    <TouchableOpacity onPress={handleLogin} style={styles.button}>
      <GoogleIcon style={styles.icon} />
      <Text style={styles.text}>Google</Text>
    </TouchableOpacity>
  );
};
export default GoogleLoginButton;
