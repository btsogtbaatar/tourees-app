import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { useSelector } from 'react-redux';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import CustomGradientButton from '../../../../components/CustomButton/CustomGradientButton';
import CustomKeyboardAvoidingView from '../../../../components/CustomKeyboardAvoidingView/CustomKeyboardAvoidingView';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import { notifyMessage } from '../../../../components/CustomToast/CustomToast';
import OtpInputGroup from '../../../../components/OtpInputGroup/OtpInputGroup';
import { useAppDispatch } from '../../../../context/app/store';
import { RootStackParamList } from '../../../../navigation/types';
import { enableBiometric } from '../../../Shared/slice/preferenceSlice';
import { createPin } from '../../services';
import { selectUser } from '../../slice/authSlice';
import { CreatePinStyle } from '../CreatePin/CreatePin.style';

type RetypePinProps = NativeStackScreenProps<RootStackParamList, 'RetypePin'>;

const RetypePin = (props: RetypePinProps) => {
  const navigation = useNavigation();
  const { pin: newPin } = props.route.params;
  const [pin, setPin] = useState<string>('');
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();

  const onSubmit = () => {
    if (user) {
      if (newPin === pin) {
        createPin({ newPin: pin }).then(() => {
          if (user.username && pin) {
            Keychain.setGenericPassword(user.username, pin)
              .then(() => {
                dispatch(enableBiometric());
                navigation.navigate('HomeTab', { screen: 'Home' });
              })
              .catch(_error => {
                notifyMessage(
                  'Алдаа',
                  'Пин кодыг хадгалахад алдаа гарлаа.' + JSON.stringify(_error),
                );
              });
          }
        });
      } else {
        notifyMessage('Алдаа', 'Пин кодууд хоорондоо зөрж байна.');
      }
    }
  };

  return (
    <CustomKeyboardAvoidingView>
      <CustomSafeAreaView>
        <ContainerView>
          <View style={{ flex: 1 }}>
            <View style={CreatePinStyle.titleContainer}>
              <Text style={CreatePinStyle.title}>
                Та пин кодоо дахин оруулна уу.
              </Text>
            </View>
            <OtpInputGroup onChange={setPin} secureTextEntry={true} />
          </View>
          <CustomGradientButton
            disabled={pin.length < 4}
            title={'Үргэлжлүүлэх'}
            onPress={onSubmit}
          />
        </ContainerView>
      </CustomSafeAreaView>
    </CustomKeyboardAvoidingView>
  );
};

export default RetypePin;
