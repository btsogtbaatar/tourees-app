import { yupResolver } from '@hookform/resolvers/yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import * as yup from 'yup';
import CustomInput from '../../../../components/CustomInput/CustomInput';
import CustomKeyboardAvoidingView from '../../../../components/CustomKeyboardAvoidingView/CustomKeyboardAvoidingView';
import FooterButton from '../../../../components/FooterButton/FooterButton';
import Steps from '../../../../components/Step/Steps';
import TabController from '../../../../components/TabController/TabController';
import { RootStackParamList } from '../../../../navigation/types';
import { verticalScale } from '../../../../utilities';
import validations from '../../../../validations';
import { AuthChannel, AuthModel } from '../../entities';
import { signUp } from '../../services';
import styles from './Register.style';

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
    <CustomKeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>
          <View style={styles.container}>
            <View>
              <Steps groupSteps={3} steps={1} />
              <View style={{ marginVertical: verticalScale(16) }}>
                <TabController
                  firstTabLabel={t('i_email')}
                  secondTabLabel={t('i_phone')}
                  onSelectedTabChange={setAuthChannel}
                />
              </View>
              <FormProvider {...form}>
                {authChannel === AuthChannel.Email && (
                  <CustomInput
                    label={t('login.email.label')}
                    placeholder={t('login.email.placeholder')}
                    name={'email'}
                    keyboardType="email-address"
                  />
                )}
                {authChannel === AuthChannel.Phone && (
                  <CustomInput
                    label={t('login.phone.label')}
                    placeholder={t('login.phone.placeholder')}
                    name={'phone'}
                    keyboardType="phone-pad"
                  />
                )}
                <View style={{ marginTop: verticalScale(16) }}>
                  <CustomInput
                    placeholder={t('l_username')}
                    name={'username'}
                    label={t('l_usernamelabel')}
                  />
                </View>
              </FormProvider>
              <Text style={styles.otherLabel}>{t('l_usernametitle')}</Text>
            </View>
          </View>
          <FooterButton
            back={false}
            onPress={form.handleSubmit(onContinue)}
            btnDisabled={false}
          />
        </View>
      </TouchableWithoutFeedback>
    </CustomKeyboardAvoidingView>
  );
}

export default Register;
