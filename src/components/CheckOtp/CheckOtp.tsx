import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import useTimer from '../../hooks/useTimer';
import { horizontalScale, verticalScale } from '../../utilities/metrics';
import OtpInputGroup from '../OtpInputGroup/OtpInputGroup';
import Timer from '../Timer/Timer';

export type Credentials = {
  email: string;
};

export interface CheckOtpProps {
  credentials: Credentials;
  onChange: (value: string) => void;
}

export default function CheckOtp(props: Readonly<CheckOtpProps>) {
  const [counter, setCounter] = useState(200);
  const [disabled, setDisabled] = useState<boolean>(true);

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
              color: colors.primaryColor,
            }}>
            {props.credentials.email}
          </Text>
          {'\u00A0'}
          -д илгээсэн 4 оронтой кодыг оруулна уу
        </Text>
      </View>
      <OtpInputGroup onChange={props.onChange} />
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
    </>
  );
}
