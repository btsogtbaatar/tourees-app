import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as yup from 'yup';
import AuthInput from '../../../Component/AuthInput/AuthInput';
import Steps from '../../../Component/Step/Steps';
import { RegisterModule } from '../../entities';
import styles from './Register.style';

export const groupSteps = [
  { name: 'test' },
  { name: 'test1' },
  { name: 'test2' },
  { name: 'test3' },
  { name: 'test3' },
];

function Register() {
  const { t } = useTranslation();

  const [selected, setSelected] = useState<boolean>(false);

  const getRequestSchema = yup.object().shape({
    email: yup.string().required('zaaval email'),
    username: yup.string().required('zaaval username'),
  });

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterModule.RegisterStep>({
    mode: 'onChange',
    resolver: yupResolver(getRequestSchema),
  });

  const onContinue = (values: RegisterModule.RegisterStep) => {
    console.log('test1', values);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View>
            <Steps groupSteps={groupSteps} steps={1} />
            <View style={styles.subContainer}>
              <TouchableOpacity
                style={[
                  styles.emailTouch,
                  !selected ? styles.selectedBox : styles.unSelectedBox,
                ]}
                onPress={() => setSelected(false)}>
                <Text style={styles.textCenter}>И-мэйл</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.emailTouch,
                  selected ? styles.selectedBox : styles.unSelectedBox,
                ]}
                onPress={() => setSelected(true)}>
                <Text style={styles.textCenter}>Утас</Text>
              </TouchableOpacity>
            </View>
            {/* {selected ? (
              <AuthInput
                control={control}
                name="phone"
                keyboardType="default"
                placeHolder="phone"
                extra={[styles.input, styles.inputExtra]}
              />
            ) : ( */}
            <AuthInput
              control={control}
              name="email"
              keyboardType="email-address"
              placeHolder={t('l_email')}
              extra={[styles.input, styles.inputExtra]}
            />
            {/* )} */}
            <AuthInput
              control={control}
              name="username"
              placeHolder={t('l_username')}
              extra={[styles.input, styles.inputExtra]}
            />
            <Text style={styles.otherLabel}>
              Та энэ нэрээр нэвтрэх боломжтой болно.
            </Text>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.btn}
              onPress={handleSubmit(onContinue)}>
              <Text style={styles.btnTextStyle}>Үргэжлүүлэх</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default Register;
