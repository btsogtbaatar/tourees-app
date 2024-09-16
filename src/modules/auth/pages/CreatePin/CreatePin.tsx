import { useNavigation } from '@react-navigation/native';
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
import { tokenCredentials } from '../../services';
import { hasPin, selectUser } from '../../slice/authSlice';
import { CreatePinStyle } from './CreatePin.style';

const CreatePin = () => {
  const navigation = useNavigation();
  const [pin, setPin] = useState<string>('');
  const userHasPin = useSelector(hasPin);
  const user = useSelector(selectUser);

  const onSubmit = () => {
    if (user) {
      let credentials = { username: user.username, password: pin };

      if (userHasPin) {
        tokenCredentials(credentials).then(() => {
          Keychain.setGenericPassword(
            credentials.username,
            credentials.password,
          )
            .then(() => {
              navigation.navigate('HomeTab', { screen: 'Home' });
            })
            .catch(_error => {
              notifyMessage('Алдаа', 'Пин кодыг хадгалахад алдаа гарлаа.');
            });
        });
      } else {
        navigation.navigate('RetypePin', { pin });
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
                {userHasPin
                  ? 'Та пин кодоо оруулна уу.'
                  : 'Та цаашид нэвтрэхдээ ашиглах 4 оронтой пин кодоо оруулна уу.'}
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

export default CreatePin;
