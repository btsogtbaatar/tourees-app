import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as Keychain from 'react-native-keychain';
import { useSelector } from 'react-redux';
import CustomKeyboardAvoidingView from '../../../../components/CustomKeyboardAvoidingView/CustomKeyboardAvoidingView';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import { notifyMessage } from '../../../../components/CustomToast/CustomToast';
import Pin from '../../../../components/Pin/Pin';
import { RootStackParamList } from '../../../../navigation/types';
import { tokenCredentials } from '../../services';
import { selectUser } from '../../slice/authSlice';

type EnterPinProps = NativeStackScreenProps<RootStackParamList, 'EnterPin'>;

const EnterPin = (props: EnterPinProps) => {
  const navigation = useNavigation();
  const user = useSelector(selectUser);
  const { t } = useTranslation();

  const onSubmit = (pin: string) => {
    let credentials = { username: user!.username, password: pin };

    tokenCredentials(credentials).then(() => {
      Keychain.setGenericPassword(credentials.username, credentials.password, {
        service: 'tourees',
        accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE,
      })
        .then(() => {
          if (props.route.params.authenticating === true) {
            navigation.navigate('HomeTab', { screen: 'Home' });
          } else {
            navigation.navigate('CreatePin', { oldPin: pin });
          }
        })
        .catch(_error => {
          notifyMessage(t('error'), t('pin.errorSaving'));
        });
    });
  };

  return (
    <CustomKeyboardAvoidingView>
      <CustomSafeAreaView>
        <Pin title={t('pin.enterPin')} onSubmit={onSubmit} />
      </CustomSafeAreaView>
    </CustomKeyboardAvoidingView>
  );
};

export default EnterPin;
