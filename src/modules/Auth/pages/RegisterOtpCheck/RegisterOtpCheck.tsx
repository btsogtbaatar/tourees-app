import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import CustomKeyboardAvoidingView from '../../../../components/CustomKeyboardAvoidingView/CustomKeyboardAvoidingView';
import FooterButton from '../../../../components/FooterButton/FooterButton';
import Modal from '../../../../components/Modal/Modal';
import OtpInput from '../../../../components/OptInput/OtpInput';
import Steps from '../../../../components/Step/Steps';
import Timer from '../../../../components/Timer/Timer';
import { colors } from '../../../../constants/colors';
import { ModalContext } from '../../../../context/modal/modal.context';
import { actions } from '../../../../context/modal/modal.reducer';
import useTimer from '../../../../hooks/useTimer';
import { horizontalScale, verticalScale } from '../../../../utilities';
import { AuthStateToken } from '../../entities/auth.model';
import { AuthStackParamList } from '../../navigation/types';
import { activate } from '../../services';

type RegisterOtpCheckProps = NativeStackScreenProps<
  AuthStackParamList,
  'RegisterOtpCheck'
>;

function RegisterOtpCheck({
  route,
  navigation,
}: Readonly<RegisterOtpCheckProps>) {
  const { t } = useTranslation();
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
  const [otpValue, setOtpValue] = useState<string>('');
  const [counter, setCounter] = useState(200);
  const [disabled, setDisabled] = useState<boolean>(true);
  const { dispatch: dispatchModal } = useContext(ModalContext);
  const { registration } = route.params;

  useTimer(
    (count, shouldButtonEnabled) => {
      setCounter(count);
      if (shouldButtonEnabled) {
        setDisabled(false);
      }
    },
    () => {
      setDisabled(false);
    },
    counter,
  );

  const resend = () => {
    setCounter(100);
    setDisabled(true);
  };

  const checkOtp = () => {
    activate({
      email: registration?.email,
      phoneNumber: registration?.phoneNumber,
      value: otpValue,
    }).then(
      (_response: AuthStateToken) => {
        navigation.navigate('RegisterTermAndCondition');
      },
      (err: any) => {
        console.log('🚀 ~ checkOtp ~ err:', err);
        dispatchModal({
          type: actions.SHOW,
          component: <Modal title={err.message} />,
        });
      },
    );
  };
  return (
    <CustomKeyboardAvoidingView>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: horizontalScale(16) }}>
          <View style={{ flex: 1 }}>
            <Steps groupSteps={3} steps={3} />
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
                    color: colors.primaryColor,
                  }}>
                  {registration?.email ?? registration?.phoneNumber}
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
              <View style={{ marginLeft: 5 }}>
                {disabled ? (
                  <Timer counter={counter} />
                ) : (
                  <Pressable
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => resend()}>
                    <Text
                      style={{
                        color: colors.primaryColor,
                        fontWeight: '700',
                        fontSize: 14,
                        fontFamily: 'Nunito',
                      }}>
                      дахин илгээх
                    </Text>
                  </Pressable>
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
          btnDisabled={!btnDisabled || !disabled}
        />
      </View>
    </CustomKeyboardAvoidingView>
  );
}

export default RegisterOtpCheck;
