import { yupResolver } from '@hookform/resolvers/yup';
import { NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import * as yup from 'yup';
import { authService } from '../../../../../api/services/auth/auth.service';
import { AuthStackParamList } from '../../../../../types/AuthStackParamList';
import { verticalScale } from '../../../../../uitls/metrics';
import validations from '../../../../../uitls/validations';
import CustomInput from '../../../../Component/CustomInput/CustomInput';
import CustomKeyboardAvoidingView from '../../../../Component/CustomKeyboardAvoidingView/CustomKeyboardAvoidingView';
import FooterButton from '../../../../Component/FooterButton/FooterButton';
import Steps from '../../../../Component/Step/Steps';
import TabController from '../../../../Component/TabController/TabController';
import { RegisterModule, UsernameResponse } from '../../../entities';
import { AuthChannel } from '../Login/Login';
import styles from './Register.style';
interface RegisterProps {
  navigation: NavigationProp<AuthStackParamList>;
}
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

  const onContinue = (values: RegisterModule.RegisterStep) => {
    if (AuthChannel.Email === authChannel) {
      values.phone = '';
    } else if (AuthChannel.Phone === authChannel) {
      values.email = '';
    }
    authService.checkEmail(values).then(
      (res: UsernameResponse[]) => {
        const type: RegisterModule.RegisterType = {
          email: values.email,
          phone: values.phone,
          type: 'user',
        };
        navigation.navigate('SignUp1', { values: res, registerType: type });
      },
      (err: any) => {
        console.log(err, 'errr');
      },
    );
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
                <CustomInput
                  placeholder={t('l_username')}
                  name={'username'}
                  label={t('l_usernamelabel')}
                  extra={{ marginTop: verticalScale(16) }}
                />
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
