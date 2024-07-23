import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { FacebookIcon } from '../../assets/svg';
import styles from './SocialLoginButton.style';

export default class FbLoginButton extends Component {
  handleLogin() {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        console.log(result);
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              result?.grantedPermissions?.toString(),
          );
          AccessToken.getCurrentAccessToken().then(data => {
            console.log(data?.accessToken.toString());
          });
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  }
  render() {
    return (
      <TouchableOpacity onPress={this.handleLogin} style={styles.button}>
        <FacebookIcon style={styles.icon} />
        <Text style={styles.text}>Facebook</Text>
      </TouchableOpacity>
    );
  }
}
