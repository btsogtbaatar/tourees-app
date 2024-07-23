import { yupResolver } from '@hookform/resolvers/yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import * as yup from 'yup';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import CustomInput from '../../../../components/CustomInput/CustomInput';
import CustomKeyboardAvoidingView from '../../../../components/CustomKeyboardAvoidingView/CustomKeyboardAvoidingView';
import CustomTouchableWithoutFeedback from '../../../../components/CustomTouchableWithoutFeedback/CustomTouchableWithoutFeedback';
import FooterButton from '../../../../components/FooterButton/FooterButton';
import FullHeightView from '../../../../components/FullHeightView/FullHeightView';
import LoadingPage from '../../../../components/Loading/LoadingPage';
import TabController from '../../../../components/TabController/TabController';
import { verticalScale } from '../../../../utilities/metrics';
import validations from '../../../../validations';
import { AuthChannel, AuthModel } from '../../entities';
import { AuthStackParamList } from '../../navigation/types';
import { sendOtp } from '../../services';

type LoginProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function Login(props: Readonly<LoginProps>) {
  const [loading, setLoading] = useState<boolean>(false);
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
    phone:
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
        props.navigation.navigate('LoginOtpCheck', { credentials });
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
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
                  <CustomInput
                    label={t('email.label')}
                    placeholder={t('email.placeholder')}
                    name={'email'}
                    keyboardType="email-address"
                  />
                )}
                {authChannel === AuthChannel.Phone && (
                  <CustomInput
                    label={t('phone.label')}
                    placeholder={t('phone.placeholder')}
                    name={'phone'}
                    keyboardType="phone-pad"
                  />
                )}
              </FormProvider>
            </View>
          </ContainerView>
          <FooterButton
            back={false}
            text={t('check.label')}
            onPress={form.handleSubmit(onSubmit)}
            btnDisabled={!form.formState.isValid}
          />
        </FullHeightView>
      </CustomTouchableWithoutFeedback>
    </CustomKeyboardAvoidingView>
  );
}
