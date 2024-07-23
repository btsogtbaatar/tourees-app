import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { GoogleIcon } from '../../assets/svg';
import styles from './SocialLoginButton.style';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default class GoogleLoginButton extends Component {
  async handleLogin() {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // const user = await GoogleSignin.getCurrentUser();
      // console.log('User', user);
      console.log(userInfo);
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <TouchableOpacity onPress={this.handleLogin} style={styles.button}>
        <GoogleIcon style={styles.icon} />
        <Text style={styles.text}>Google</Text>
      </TouchableOpacity>
    );
  }
}
