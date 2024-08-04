import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CheckOtp from '../../../../components/CheckOtp/CheckOtp';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import CustomKeyboardAvoidingView from '../../../../components/CustomKeyboardAvoidingView/CustomKeyboardAvoidingView';
import CustomTouchableWithoutFeedback from '../../../../components/CustomTouchableWithoutFeedback/CustomTouchableWithoutFeedback';
import FooterButton from '../../../../components/FooterButton/FooterButton';
import FullHeightView from '../../../../components/FullHeightView/FullHeightView';
import { RootStackParamList } from '../../../../navigation/types';
import { token } from '../../services';

type LoginOtpCheckProps = NativeStackScreenProps<
  RootStackParamList,
  'LoginOtpCheck'
>;

export default function LoginOtpCheck(props: Readonly<LoginOtpCheckProps>) {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [value, setValue] = useState<string>();

  const { credentials } = props.route.params;

  const checkOtp = () => {
    if (value) {
      token({ ...credentials, value }).then(() => {
        navigation.navigate('HomeTab', { screen: 'Home' });
      });
    }
  };

  return (
    <CustomKeyboardAvoidingView>
      <CustomTouchableWithoutFeedback>
        <FullHeightView>
          <ContainerView>
            <CheckOtp credentials={credentials} onChange={setValue} />
          </ContainerView>
          <FooterButton
            back={true}
            text={t('l_confirm')}
            onPress={checkOtp}
            btnDisabled={value?.length !== 4}
          />
        </FullHeightView>
      </CustomTouchableWithoutFeedback>
    </CustomKeyboardAvoidingView>
  );
}
