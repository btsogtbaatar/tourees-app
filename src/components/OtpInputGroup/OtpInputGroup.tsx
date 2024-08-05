import React from 'react';
import { View } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import { colors } from '../../theme';
import OtpInputGroupStyle from './OtpInputGroup.style';

export interface OtpInputGroupProps {
  onChange: (value: string) => void;
}

export default function OtpInputGroup(props: Readonly<OtpInputGroupProps>) {
  return (
    <View style={OtpInputGroupStyle.container}>
      <OtpInput
        numberOfDigits={4}
        focusColor={colors.primary500}
        onTextChange={e => props.onChange(e)}
        theme={{
          containerStyle: OtpInputGroupStyle.wrapper,
          pinCodeContainerStyle: OtpInputGroupStyle.digits,
        }}
      />
    </View>
  );
}
