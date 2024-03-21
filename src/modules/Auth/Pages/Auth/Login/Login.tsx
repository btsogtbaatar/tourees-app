import { yupResolver } from '@hookform/resolvers/yup';
import { NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import * as yup from 'yup';
import { authService } from '../../../../../api/services/auth';
import { LoginModel } from '../../../../../context/entities';
import { AuthStackParamList } from '../../../../../types/AuthStackParamList';
import { verticalScale } from '../../../../../uitls/metrics';
import validations from '../../../../../uitls/validations';
import ContainerView from '../../../../Component/ContainerView/ContainerView';
import CustomInput from '../../../../Component/CustomInput/CustomInput';
import CustomKeyboardAvoidingView from '../../../../Component/CustomKeyboardAvoidingView/CustomKeyboardAvoidingView';
import CustomTouchableWithoutFeedback from '../../../../Component/CustomTouchableWithoutFeedback/CustomTouchableWithoutFeedback';
import FooterButton from '../../../../Component/FooterButton/FooterButton';
import FullHeightView from '../../../../Component/FullHeightView/FullHeightView';
import TabController from '../../../../Component/TabController/TabController';

interface LoginProps {
  navigation: NavigationProp<AuthStackParamList>;
}

export enum AuthChannel {
  Email = 0,
  Phone = 1,
}

export default function Login(props: Readonly<LoginProps>) {
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

  const onSubmit = (credentials: LoginModel.Credentials) => {
    authService.generateOtpLogin(credentials).then(response => {
      props.navigation.navigate('LoginOtpCheck', { credentials });
    });
  };

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

const styles = StyleSheet.create({});
