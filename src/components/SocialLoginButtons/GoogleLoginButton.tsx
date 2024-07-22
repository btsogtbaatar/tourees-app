import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { GoogleIcon } from '../../assets/svg';
import styles from './SocialLoginButton.style';

export default class GoogleLoginButton extends Component {
  handleLogin() {}
  render() {
    return (
      <TouchableOpacity onPress={this.handleLogin} style={styles.button}>
        <GoogleIcon style={styles.icon} />
        <Text style={styles.text}>Google</Text>
      </TouchableOpacity>
    );
  }
}
