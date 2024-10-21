import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import CheckOtp from '../../../../components/CheckOtp/CheckOtp';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import CustomGradientButton from '../../../../components/CustomButton/CustomGradientButton';
import CustomKeyboardAvoidingView from '../../../../components/CustomKeyboardAvoidingView/CustomKeyboardAvoidingView';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import Steps from '../../../../components/Steps/Steps';
import { RootStackParamList } from '../../../../navigation/types';
import { AuthModel } from '../../entities';
import { activate, sendOtp } from '../../services';
import { RegisterOtpCheckStyle } from './RegisterOtpCheck.style';

type RegisterOtpCheckProps = NativeStackScreenProps<
  RootStackParamList,
  'RegisterOtpCheck'
>;

function RegisterOtpCheck({
  route,
  navigation,
}: Readonly<RegisterOtpCheckProps>) {
  const { t } = useTranslation();
  const [otpValue, setOtpValue] = useState<string>('');
  const { registration } = route.params;

  const checkOtp = () => {
    activate({
      email: registration?.email,
      phoneNumber: registration?.phoneNumber,
      value: otpValue,
    }).then((_response: AuthModel.User) => {
      navigation.navigate('RegisterTermAndCondition');
    });
  };

  const resendOtp = () => {
    sendOtp(registration);
  };

  return (
    <CustomKeyboardAvoidingView>
      <CustomSafeAreaView>
        <ContainerView>
          <View style={RegisterOtpCheckStyle.innerContainer}>
            <Steps totalSteps={3} currentStepIndex={2} />
            <CheckOtp
              credentials={registration}
              onChange={setOtpValue}
              onResend={resendOtp}
            />
          </View>
          <CustomGradientButton
            title={t('l_confirm')}
            onPress={checkOtp}
            disabled={otpValue?.length !== 4}
          />
        </ContainerView>
      </CustomSafeAreaView>
    </CustomKeyboardAvoidingView>
  );
}

export default RegisterOtpCheck;
