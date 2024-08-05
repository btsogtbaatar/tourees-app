import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import * as yup from 'yup';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import CustomDivider from '../../../../components/CustomDivider/CustomDivider';
import CustomFormInput from '../../../../components/CustomInput/CustomFormInput';
import CustomKeyboardAvoidingView from '../../../../components/CustomKeyboardAvoidingView/CustomKeyboardAvoidingView';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import CustomTouchableWithoutFeedback from '../../../../components/CustomTouchableWithoutFeedback/CustomTouchableWithoutFeedback';
import FooterButton from '../../../../components/FooterButton/FooterButton';
import FullHeightView from '../../../../components/FullHeightView/FullHeightView';
import Loading from '../../../../components/Loading/Loading';
import {
  FbLoginButton,
  GoogleLoginButton,
} from '../../../../components/SocialLoginButtons';
import TabController from '../../../../components/TabController/TabController';
import { verticalScale } from '../../../../utilities/metrics';
import validations from '../../../../validations';
import { AuthChannel, AuthModel } from '../../entities';
import { sendOtp, socialCustomerAuthenticate } from '../../services';
import styles from './Login.style';

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();
  const { t } = useTranslation(undefined, { keyPrefix: 'login' });
  const [authChannel, setAuthChannel] = useState<AuthChannel>(
    AuthChannel.Email,
  );

  const schema = yup.object().shape({
    email:
      authChannel === AuthChannel.Email
        ? yup
            .string()
            .required(t('email.errors.required'))
            .matches(validations.email, t('email.errors.validation'))
        : yup.string(),
    phoneNumber:
      authChannel === AuthChannel.Phone
        ? yup
            .string()
            .required(t('phone.errors.required'))
            .matches(validations.phoneNumber, t('phone.errors.validation'))
        : yup.string(),
  });

  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = (credentials: AuthModel.Credentials) => {
    setLoading(true);

    sendOtp(credentials)
      .then(() => {
        navigation.navigate('LoginOtpCheck', { credentials });
      })
      .finally(() => setLoading(false));
  };

  const socialAuthentication = (socialToken: AuthModel.SocialToken) => {
    setLoading(true);
    socialCustomerAuthenticate(socialToken)
      .then(() => {
        navigation.navigate('HomeTab', {
          screen: 'Home',
        });
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <CustomSafeAreaView>
      <CustomKeyboardAvoidingView>
        <CustomTouchableWithoutFeedback>
          <FullHeightView>
            <ContainerView>
              <View>
                <View style={{ marginBottom: verticalScale(16) }}>
                  <TabController
                    onSelectedTabChange={setAuthChannel}
                    firstTabLabel={t('email.tab')}
                    secondTabLabel={t('phone.tab')}
                  />
                </View>
                <FormProvider {...form}>
                  {authChannel === AuthChannel.Email && (
                    <CustomFormInput
                      label={t('email.label')}
                      placeholder={t('email.placeholder')}
                      name={'email'}
                      keyboardType="email-address"
                    />
                  )}
                  {authChannel === AuthChannel.Phone && (
                    <CustomFormInput
                      label={t('phone.label')}
                      placeholder={t('phone.placeholder')}
                      name={'phoneNumber'}
                      keyboardType="phone-pad"
                    />
                  )}
                </FormProvider>
                <CustomDivider>{t('or')}</CustomDivider>
                <View style={styles.socialContainer}>
                  <FbLoginButton onSuccess={socialAuthentication} />
                  <GoogleLoginButton onSuccess={socialAuthentication} />
                </View>
              </View>
            </ContainerView>
            <FooterButton
              text={t('check.label')}
              onPress={form.handleSubmit(onSubmit)}
              disabled={!form.formState.isValid}
            />
          </FullHeightView>
        </CustomTouchableWithoutFeedback>
      </CustomKeyboardAvoidingView>
    </CustomSafeAreaView>
  );
}
