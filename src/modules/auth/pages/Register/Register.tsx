import { yupResolver } from '@hookform/resolvers/yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import * as yup from 'yup';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import CustomGradientButton from '../../../../components/CustomButton/CustomGradientButton';
import CustomFormInput from '../../../../components/CustomInput/CustomFormInput';
import CustomKeyboardAvoidingView from '../../../../components/CustomKeyboardAvoidingView/CustomKeyboardAvoidingView';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import Steps from '../../../../components/Steps/Steps';
import TabController from '../../../../components/TabController/TabController';
import { RootStackParamList } from '../../../../navigation/types';
import validations from '../../../../validations';
import { AuthChannel, AuthModel } from '../../entities';
import { signUp } from '../../services';
import { RegisterStyle } from './Register.style';

type RegisterProps = NativeStackScreenProps<RootStackParamList, 'Register'>;

function Register({ navigation }: RegisterProps) {
  const { t } = useTranslation();
  const [authChannel, setAuthChannel] = useState<AuthChannel>(
    AuthChannel.Email,
  );

  const schema = yup.object().shape({
    email:
      authChannel === AuthChannel.Email
        ? yup
            .string()
            .required(t('login.email.errors.required'))
            .matches(validations.email, t('login.email.errors.validation'))
        : yup.string(),
    phone:
      authChannel === AuthChannel.Phone
        ? yup
            .string()
            .required(t('login.phone.errors.required'))
            .matches(
              validations.phoneNumber,
              t('login.phone.errors.validation'),
            )
        : yup.string(),
    username: yup.string().required(t('r_username')),
  });

  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onContinue = (values: AuthModel.RegisterRequest) => {
    if (AuthChannel.Email === authChannel) {
      values.phoneNumber = '';
    } else if (AuthChannel.Phone === authChannel) {
      values.email = '';
    }

    signUp(values).then((response: AuthModel.RegisterResponse) => {
      navigation.navigate('RegisterOtpCheck', {
        registration: response,
      });
    });
  };

  return (
    <CustomSafeAreaView>
      <CustomKeyboardAvoidingView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ContainerView>
            <View style={RegisterStyle.container}>
              <View style={RegisterStyle.steps}>
                <Steps currentStepIndex={1} totalSteps={3} />
              </View>
              <View style={RegisterStyle.tabController}>
                <TabController
                  firstTabLabel={t('i_email')}
                  secondTabLabel={t('i_phone')}
                  onSelectedTabChange={setAuthChannel}
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
                    name={'phone'}
                    keyboardType="phone-pad"
                  />
                )}
                <View style={RegisterStyle.formController}>
                  <CustomFormInput
                    placeholder={t('l_username')}
                    name={'username'}
                    label={t('l_usernamelabel')}
                  />
                </View>
              </FormProvider>
            </View>
            <CustomGradientButton
              onPress={form.handleSubmit(onContinue)}
              title={'Үргэлжлүүлэх'}
            />
          </ContainerView>
        </TouchableWithoutFeedback>
      </CustomKeyboardAvoidingView>
    </CustomSafeAreaView>
  );
}

export default Register;
