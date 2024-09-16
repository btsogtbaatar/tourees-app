import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import CheckOtp from '../../../../components/CheckOtp/CheckOtp';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import CustomGradientButton from '../../../../components/CustomButton/CustomGradientButton';
import CustomKeyboardAvoidingView from '../../../../components/CustomKeyboardAvoidingView/CustomKeyboardAvoidingView';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import CustomTouchableWithoutFeedback from '../../../../components/CustomTouchableWithoutFeedback/CustomTouchableWithoutFeedback';
import FullHeightView from '../../../../components/FullHeightView/FullHeightView';
import { RootStackParamList } from '../../../../navigation/types';
import { selectBiometricEnabled } from '../../../Shared/slice/preferenceSlice';
import { sendOtp, tokenOtp } from '../../services';

type LoginOtpCheckProps = NativeStackScreenProps<
  RootStackParamList,
  'LoginOtpCheck'
>;

export default function LoginOtpCheck(props: Readonly<LoginOtpCheckProps>) {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [value, setValue] = useState<string>();
  const biometricEnabled = useSelector(selectBiometricEnabled);

  const { credentials } = props.route.params;

  const checkOtp = () => {
    if (value) {
      tokenOtp({ ...credentials, value }).then(() => {
        console.log('🚀 ~ tokenOtp ~ biometricEnabled:', biometricEnabled);
        if (biometricEnabled === undefined) {
          navigation.navigate('BiometricConsent');
        } else {
          navigation.navigate('HomeTab', { screen: 'Home' });
        }
      });
    }
  };

  const resendOtp = () => {
    sendOtp(credentials);
  };

  return (
    <CustomSafeAreaView>
      <CustomKeyboardAvoidingView>
        <CustomTouchableWithoutFeedback>
          <FullHeightView>
            <ContainerView>
              <View style={{ flex: 1 }}>
                <CheckOtp
                  credentials={credentials}
                  onChange={setValue}
                  onResend={resendOtp}
                />
              </View>
              <CustomGradientButton
                title={t('l_confirm')}
                onPress={checkOtp}
                disabled={value?.length !== 4}
              />
            </ContainerView>
          </FullHeightView>
        </CustomTouchableWithoutFeedback>
      </CustomKeyboardAvoidingView>
    </CustomSafeAreaView>
  );
}
