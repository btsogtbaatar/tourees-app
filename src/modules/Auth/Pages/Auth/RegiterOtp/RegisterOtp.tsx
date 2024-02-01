import React, { useState } from 'react';
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { horizontalScale, verticalScale } from '../../../../../uitls/metrics';
import FooterButton from '../../../../Component/FooterButton/FooterButton';
import OtpInput from '../../../../Component/OptInput/OtpInput';
import Steps from '../../../../Component/Step/Steps';
import { NavigationProp } from '@react-navigation/native';
import { AuthStackParamList } from '../../../../../types/AuthStackParamList';
import { RegisterModule } from '../../../entities';
import { Colors } from '../../../../../../constants/Colors';
import { useTranslation } from 'react-i18next';
import { authService } from '../../../../../api/services/auth/';
import Timer from '../../../../Component/Timer/Timer';
import useTimer from '../../../../../hooks/useTimer';

interface Props {
  route: {
    params: {
      signUp?: RegisterModule.RegisterType;
    };
  };
  navigation: NavigationProp<AuthStackParamList>;
}

function RegisterOtp({ route, navigation }: Props) {
  const { signUp } = route.params;
  const { t } = useTranslation();
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
  const [otpValue, setOtpValue] = useState<string>('');
  const [counter, setCounter] = useState(10);
  const [disabled, setDisabled] = useState<boolean>(true);

  useTimer(
    (count, shouldButtonEnabled) => {
      setCounter(count);
      if (shouldButtonEnabled) setDisabled(false);
    },
    () => {
      setDisabled(false);
    },
    counter,
  );

  const resend = () => {
    setCounter(20);
    setDisabled(true);
  };
  const checkOtp = () => {
    const data: RegisterModule.RegisterType = {
      ...signUp,
      otp: otpValue,
    };
    console.log(data, 'datas');

    authService.checkOtp(data).then(
      res => {
        console.log(res);
        navigation.navigate('SignUpTerm');
      },
      err => {
        Alert.alert('test', err.response.data.message);
        console.log(err.response.data, 'aldaa');
      },
    );
  };
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={100}
      style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: horizontalScale(16) }}>
          <View style={{ flex: 1 }}>
            <Steps groupSteps={3} steps={3}></Steps>
            <View
              style={{
                paddingHorizontal: horizontalScale(14),
                alignItems: 'center',
                marginTop: verticalScale(30),
              }}>
              <Text style={{ textAlign: 'center' }}>
                Таны
                {'\u00A0'}
                <Text
                  style={{
                    color: Colors.primaryColor,
                  }}>
                  {signUp?.email}
                </Text>
                {'\u00A0'}
                -д илгээсэн 4 оронтой кодыг оруулна уу
              </Text>
            </View>
            <View
              style={{
                marginVertical: verticalScale(50),
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <OtpInput
                codeLength={4}
                minWidth={50}
                onChange={value => {
                  setOtpValue(value.join(''));
                  setBtnDisabled(value.join('').length === 4);
                }}
              />
            </View>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text>Код дахин илгээх:</Text>
              <View style={{marginLeft: 5}}>
                {disabled ? (
                  <Timer counter={counter} />
                ) : (
                  <TouchableOpacity
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => resend()}>
                    <Text style={{color: Colors.primaryColor, fontWeight: '700', fontSize: 14}}>dahin elgeeh</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View>
        <FooterButton
          back={true}
          text={t('l_confirm')}
          onPress={() => {
            checkOtp();
          }}
          btnDisabled={(!btnDisabled || !disabled)}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

export default RegisterOtp;
