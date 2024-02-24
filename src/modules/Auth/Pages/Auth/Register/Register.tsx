import { yupResolver } from '@hookform/resolvers/yup';
import { useHeaderHeight } from '@react-navigation/elements';
import { NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as yup from 'yup';
import { Colors } from '../../../../../../constants/Colors';
import { authService } from '../../../../../api/services/auth/auth.service';
import EmailIcon from '../../../../../assets/svg/Email';
import PhoneIcon from '../../../../../assets/svg/PhoneIcon';
import { AuthStackParamList } from '../../../../../types/AuthStackParamList';
import validations from '../../../../../uitls/validations';
import AuthLabelInput from '../../../../Component/AuthInput/AuthLabelInput';
import FooterButton from '../../../../Component/FooterButton/FooterButton';
import Steps from '../../../../Component/Step/Steps';
import { RegisterModule, UsernameResponse } from '../../../entities';
import styles from './Register.style';
interface RegisterProps {
  navigation: NavigationProp<AuthStackParamList>;
}
function Register({ navigation }: RegisterProps) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<boolean>(false);
  const headerHeight = useHeaderHeight();
  const getRequestSchema = yup.object().shape({
    email: selected
      ? yup.string().notRequired()
      : yup
          .string()
          .required(t('l_email'))
          .matches(validations.email, t('m_email')),
    username: yup.string().required(t('r_username')),
    phone: selected
      ? yup.string().required(t('l_phone'))
      : yup.string().notRequired(),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterModule.RegisterStep>({
    mode: 'onChange',
    resolver: yupResolver(getRequestSchema),
  });

  const onContinue = (values: RegisterModule.RegisterStep) => {
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={
        Platform.OS === 'ios' ? headerHeight : headerHeight * 1.8
      }
      style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>
          <View style={styles.container}>
            <View>
              <Steps groupSteps={3} steps={1} />
              <View style={styles.subContainer}>
                <TouchableOpacity
                  style={[
                    styles.emailTouch,
                    !selected ? styles.selectedBox : styles.unSelectedBox,
                  ]}
                  onPress={() => {
                    control._reset();
                    setSelected(false);
                  }}>
                  <EmailIcon
                    color={
                      !selected ? Colors.primaryColor : Colors.brandGray200
                    }
                  />
                  <Text style={styles.textStyle}>{t('i_email')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.emailTouch,
                    selected ? styles.selectedBox : styles.unSelectedBox,
                  ]}
                  onPress={() => {
                    control._reset();
                    setSelected(true);
                  }}>
                  <PhoneIcon
                    color={selected ? Colors.primaryColor : Colors.brandGray200}
                  />
                  <Text style={styles.textStyle}>{t('i_phone')}</Text>
                </TouchableOpacity>
              </View>
              {selected ? (
                <AuthLabelInput
                  control={control}
                  name="phone"
                  placeHolder={t('m_phone')}
                  keyboardType="phone-pad"
                  label={t('l_phone')}
                />
              ) : (
                <AuthLabelInput
                  control={control}
                  name="email"
                  placeHolder={t('l_email')}
                  keyboardType="email-address"
                  label={t('l_emaillabel')}
                />
              )}
              <AuthLabelInput
                control={control}
                name="username"
                placeHolder={t('l_username')}
                label={t('l_usernamelabel')}
              />
              <Text style={styles.otherLabel}>{t('l_usernametitle')}</Text>
            </View>
          </View>
          <FooterButton
            back={false}
            onPress={handleSubmit(onContinue)}
            btnDisabled={false}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default Register;
