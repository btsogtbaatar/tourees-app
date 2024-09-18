import React from 'react';
import {
  ButtonProps,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../theme';
import { CustomButtonStyle } from './CustomButton.style';

export interface CustomGradientButtonProps extends ButtonProps {
  style?: {
    button: StyleProp<ViewStyle>;
    text: StyleProp<TextStyle>;
  };
}

const CustomGradientButton = (props: CustomGradientButtonProps) => {
  const getColors = () => {
    if (props.disabled) {
      return [colors.primary100, colors.primary100];
    }

    return [colors.primaryGradient, colors.primary500];
  };

  return (
    <TouchableOpacity onPress={props.onPress} disabled={props.disabled}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={getColors()}
        style={[CustomButtonStyle.button, props.style?.button]}>
        <Text style={[CustomButtonStyle.text, props.style?.text]}>
          {props.title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CustomGradientButton;
