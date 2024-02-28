import React, { useState } from 'react';
import CheckOtp from '../../../../Component/CheckOtp/CheckOtp';
import ContainerView from '../../../../Component/ContainerView/ContainerView';
import CustomKeyboardAvoidingView from '../../../../Component/CustomKeyboardAvoidingView/CustomKeyboardAvoidingView';
import CustomTouchableWithoutFeedback from '../../../../Component/CustomTouchableWithoutFeedback/CustomTouchableWithoutFeedback';
import FullHeightView from '../../../../Component/FullHeightView/FullHeightView';
import FooterButton from '../../../../Component/FooterButton/FooterButton';
import { useTranslation } from 'react-i18next';
import { AuthStateToken, LoginModel } from '../../../../../context/entities';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../../../../types/AuthStackParamList';
import { authService } from '../../../../../api/services/auth';
import { authStore } from '../../../../../context/auth/store';
import { MainStackParamList } from '../../../../../types/MainStackParamList';

interface LoginOtpCheckProps {
  route: {
    params: {
      credentials: LoginModel.Credentials;
    };
  };
  navigation: NavigationProp<AuthStackParamList>;
}

export default function LoginOtpCheck(props: Readonly<LoginOtpCheckProps>) {
  if (!props.route.params?.credentials) {
    throw new Error('Credentials cannot be undefined.');
  }

  const navigation = useNavigation<MainStackParamList>();
  const authState = authStore(state => state);
  const { t } = useTranslation();
  const [otp, setOtp] = useState<string>();

  const { credentials } = props.route.params;

  const checkOtp = () => {
    if (otp) {
      authService
        .login({ ...credentials, otp })
        .then((response: AuthStateToken) => {
          authState.setAccessToken(response, false);
          authState.setAuthentication(true);
          navigation.navigate('DashboardStack', {});
        });
    }
  };

  return (
    <CustomKeyboardAvoidingView>
      <CustomTouchableWithoutFeedback>
        <FullHeightView>
          <ContainerView>
            <CheckOtp credentials={credentials} onChange={setOtp}></CheckOtp>
          </ContainerView>
          <FooterButton
            back={true}
            text={t('l_confirm')}
            onPress={checkOtp}
            btnDisabled={otp?.length !== 4}
          />
        </FullHeightView>
      </CustomTouchableWithoutFeedback>
    </CustomKeyboardAvoidingView>
  );
}
