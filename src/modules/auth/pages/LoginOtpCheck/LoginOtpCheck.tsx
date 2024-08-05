import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CheckOtp from '../../../../components/CheckOtp/CheckOtp';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import CustomKeyboardAvoidingView from '../../../../components/CustomKeyboardAvoidingView/CustomKeyboardAvoidingView';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
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
    <CustomSafeAreaView>
      <CustomKeyboardAvoidingView>
        <CustomTouchableWithoutFeedback>
          <FullHeightView>
            <ContainerView>
              <CheckOtp credentials={credentials} onChange={setValue} />
            </ContainerView>
            <FooterButton
              showBackButton={true}
              text={t('l_confirm')}
              onPress={checkOtp}
              disabled={value?.length !== 4}
            />
          </FullHeightView>
        </CustomTouchableWithoutFeedback>
      </CustomKeyboardAvoidingView>
    </CustomSafeAreaView>
  );
}
