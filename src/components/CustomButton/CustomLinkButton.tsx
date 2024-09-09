import React from 'react';
import {
  ButtonProps,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { CustomButtonStyle } from './CustomButton.style';
import { CustomLinkButtonStyle } from './CustomLinkButton.style';

export interface CustomGradientButtonProps extends ButtonProps {
  style?: {
    button: StyleProp<ViewStyle>;
    text: StyleProp<TextStyle>;
  };
}

const CustomLinkButton = (props: CustomGradientButtonProps) => {
  return (
    <TouchableOpacity onPress={props.onPress} disabled={props.disabled}>
      <View
        style={[
          CustomButtonStyle.button,
          CustomLinkButtonStyle.button,
          props.style?.button,
        ]}>
        <Text
          style={[
            CustomButtonStyle.text,
            CustomLinkButtonStyle.text,
            props.style?.text,
          ]}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomLinkButton;
