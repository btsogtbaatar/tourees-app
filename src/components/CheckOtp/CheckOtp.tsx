import React from 'react';
import { Text, View } from 'react-native';

import { useTranslation } from 'react-i18next';
import OtpInputGroup from '../OtpInputGroup/OtpInputGroup';
import Timer from '../Timer/Timer';
import CheckOtpStyle from './CheckOtp.style';

export type Credentials = {
  email?: string;
};

export interface CheckOtpProps {
  credentials: Credentials;
  onChange: (value: string) => void;
  onResend: () => void;
}

export default function CheckOtp(props: Readonly<CheckOtpProps>) {
  const { t } = useTranslation();

  return (
    <>
      <View style={CheckOtpStyle.titleContainer}>
        <Text style={CheckOtpStyle.title}>
          {t('otp.your')}{' '}
          <Text style={CheckOtpStyle.highlight}>{props.credentials.email}</Text>{' '}
          {t('otp.requestCode')}
        </Text>
      </View>
      <OtpInputGroup onChange={props.onChange} />
      <View style={CheckOtpStyle.footer}>
        <Text style={CheckOtpStyle.resend}>{t('otp.resendCode')}:</Text>
        <View>
          <Timer startFrom={200} restartFrom={100} onResend={props.onResend} />
        </View>
      </View>
    </>
  );
}
