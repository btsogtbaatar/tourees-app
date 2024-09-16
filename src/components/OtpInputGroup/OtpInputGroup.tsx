import React from 'react';
import { View } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import { colors, fontFamily } from '../../theme';
import OtpInputGroupStyle from './OtpInputGroup.style';

export interface OtpInputGroupProps {
  onChange: (value: string) => void;
  secureTextEntry?: boolean;
}

export default function OtpInputGroup(props: Readonly<OtpInputGroupProps>) {
  return (
    <View style={OtpInputGroupStyle.container}>
      <OtpInput
        numberOfDigits={4}
        focusColor={colors.primaryGradient}
        onTextChange={e => props.onChange(e)}
        theme={{
          containerStyle: OtpInputGroupStyle.wrapper,
          pinCodeContainerStyle: OtpInputGroupStyle.digits,
          pinCodeTextStyle: {
            fontFamily: fontFamily,
          },
        }}
        secureTextEntry={props.secureTextEntry}
      />
    </View>
  );
}
