import React from 'react';
import { View } from 'react-native';
import { verticalScale } from '../../utilities/metrics';
import OtpInput from '../OptInput/OtpInput';

export interface OtpInputGroupProps {
  onChange: (value: string) => void;
}

export default function OtpInputGroup(props: Readonly<OtpInputGroupProps>) {
  return (
    <View
      style={{
        marginVertical: verticalScale(50),
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}>
      <OtpInput
        codeLength={4}
        minWidth={50}
        onChange={value => {
          props.onChange(value.join(''));
        }}
      />
    </View>
  );
}
