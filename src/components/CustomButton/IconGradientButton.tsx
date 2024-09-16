import React from 'react';
import {
  ButtonProps,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../theme';
import { IconGradientButtonStyle } from './IconGradientButton.style';

export interface IconGradientButtonProps extends Omit<ButtonProps, 'title'> {
  icon: React.ReactNode;
  style?: {
    button: StyleProp<ViewStyle>;
  };
}

const IconGradientButton = (props: IconGradientButtonProps) => {
  return (
    <TouchableOpacity onPress={props.onPress} disabled={props.disabled}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[colors.gray500, colors.dark700]}
        style={[IconGradientButtonStyle.button, props.style?.button]}>
        {props.icon}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default IconGradientButton;
