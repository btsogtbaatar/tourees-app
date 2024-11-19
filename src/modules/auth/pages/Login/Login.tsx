import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import Banner from '../../../../components/Banner/Banner';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import CustomGradientButton from '../../../../components/CustomButton/CustomGradientButton';
import IconGradientButton from '../../../../components/CustomButton/IconGradientButton';
import CustomDivider from '../../../../components/CustomDivider/CustomDivider';
import CustomFormInput from '../../../../components/CustomInput/CustomFormInput';
import CustomKeyboardAvoidingView from '../../../../components/CustomKeyboardAvoidingView/CustomKeyboardAvoidingView';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import { notifyMessage } from '../../../../components/CustomToast/CustomToast';
import CustomTouchableWithoutFeedback from '../../../../components/CustomTouchableWithoutFeedback/CustomTouchableWithoutFeedback';
import FullHeightView from '../../../../components/FullHeightView/FullHeightView';
import { FaceId } from '../../../../components/Icon';
import Loading from '../../../../components/Loading/Loading';
import {
  FbLoginButton,
  GoogleLoginButton,
} from '../../../../components/SocialLoginButtons';
import TabController from '../../../../components/TabController/TabController';
import { colors } from '../../../../theme';
import {
  KeychainError,
  retrieveCredentials,
} from '../../../../utilities/biometric';
import { verticalScale } from '../../../../utilities/metrics';
import validations from '../../../../validations';
import { selectBiometricEnabled } from '../../../Shared/slice/preferenceSlice';
import { AuthChannel, AuthModel } from '../../entities';
import {
  sendOtp,
  socialCustomerAuthenticate,
  tokenCredentials,
} from '../../services';
import styles from './Login.style';

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [authChannel, setAuthChannel] = useState<AuthChannel>(
    AuthChannel.Email,
  );
  const biometricEnabled = useSelector(selectBiometricEnabled);

  const schema = yup.object().shape({
    email:
      authChannel === AuthChannel.Email
        ? yup
            .string()
            .required(t('login.email.errors.required'))
            .matches(validations.email, t('login.email.errors.validation'))
        : yup.string(),
    phoneNumber:
      authChannel === AuthChannel.Phone
        ? yup
            .string()
            .required(t('login.phone.errors.required'))
            .matches(
              validations.phoneNumber,
              t('login.phone.errors.validation'),
            )
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

  const onBiometicPress = () => {
    retrieveCredentials()
      .then(credentials => {
        if (credentials) {
          tokenCredentials({
            username: credentials.username,
            password: credentials.password,
          }).then(() => {
            navigation.navigate('HomeTab', { screen: 'Home' });
          });
        } else {
          notifyMessage(t('error'), t('biometric.notSavedError'));
        }
      })
      .catch(keyChainError => {
        const error = keyChainError as KeychainError;

        if (
          !error.message.startsWith('code: 10') &&
          !error.message.startsWith('code: 13')
        ) {
          notifyMessage(t('error'), error.message);
        }
      });
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
                    firstTabLabel={t('login.email.tab')}
                    secondTabLabel={t('login.phone.tab')}
                  />
                </View>
                <FormProvider {...form}>
                  {authChannel === AuthChannel.Email && (
                    <CustomFormInput
                      label={t('login.email.label')}
                      placeholder={t('login.email.placeholder')}
                      name={'email'}
                      keyboardType="email-address"
                    />
                  )}
                  {authChannel === AuthChannel.Phone && (
                    <CustomFormInput
                      label={t('login.phone.label')}
                      placeholder={t('login.phone.placeholder')}
                      name={'phoneNumber'}
                      keyboardType="phone-pad"
                    />
                  )}
                  <View style={styles.buttonContainer}>
                    <View style={{ flex: 1 }}>
                      <CustomGradientButton
                        title={t('login.submit')}
                        onPress={form.handleSubmit(onSubmit)}
                        disabled={!form.formState.isValid}
                      />
                    </View>
                    {biometricEnabled === true && (
                      <IconGradientButton
                        icon={<FaceId color={colors.white} />}
                        onPress={onBiometicPress}
                      />
                    )}
                  </View>
                </FormProvider>
                <CustomDivider>{t('login.or')}</CustomDivider>
                <View style={styles.socialContainer}>
                  <FbLoginButton onSuccess={socialAuthentication} />
                  <GoogleLoginButton onSuccess={socialAuthentication} />
                </View>
              </View>
              <View style={styles.banner}>
                <Banner
                  key={1}
                  title={t('home.signUp')}
                  onPress={() => navigation.navigate('Register')}
                />
              </View>
            </ContainerView>
          </FullHeightView>
        </CustomTouchableWithoutFeedback>
      </CustomKeyboardAvoidingView>
    </CustomSafeAreaView>
  );
}
