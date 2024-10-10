import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

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
              notifyMessage(t('error'), t('pin.errorSaving'));
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
                  ? t("pin.enterPin")
                  : t('pin.createPin')}
              </Text>
            </View>
            <OtpInputGroup onChange={setPin} secureTextEntry={true} />
          </View>
          <CustomGradientButton
            disabled={pin.length < 4}
            title={t('pin.continue')}
            onPress={onSubmit}
          />
        </ContainerView>
      </CustomSafeAreaView>
    </CustomKeyboardAvoidingView>
  );
};

export default CreatePin;
