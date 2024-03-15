import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../../constants/Colors';
import useTimer from '../../../hooks/useTimer';
import { horizontalScale, verticalScale } from '../../../uitls/metrics';
import OtpInputGroup from '../OtpInputGroup/OtpInputGroup';
import Timer from '../Timer/Timer';
import { LoginModel } from '../../../context/entities';

export interface CheckOtpProps {
  credentials: LoginModel.Credentials;
  onChange: (value: string) => void;
}

export default function CheckOtp(props: Readonly<CheckOtpProps>) {
  const [counter, setCounter] = useState(200);
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
    setCounter(100);
    setDisabled(true);
  };

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

  return (
    <>
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
            {props.credentials.email}
          </Text>
          {'\u00A0'}
          -д илгээсэн 4 оронтой кодыг оруулна уу
        </Text>
      </View>
      <OtpInputGroup onChange={props.onChange}></OtpInputGroup>
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
            <TouchableOpacity
              style={{ justifyContent: 'center', alignItems: 'center' }}
              onPress={() => resend()}>
              <Text
                style={{
                  color: Colors.primaryColor,
                  fontWeight: '700',
                  fontSize: 14,
                  fontFamily: 'Nunito',
                }}>
                дахин илгээх
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
}
