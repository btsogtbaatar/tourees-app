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
import { useAppDispatch } from '../../../../context/app/store';
import { RootStackParamList } from '../../../../navigation/types';
import { enableBiometric } from '../../../Shared/slice/preferenceSlice';
import { createPin, updatePin } from '../../services';
import { hasPin, selectUser, setHasPin } from '../../slice/authSlice';

type RetypePinProps = NativeStackScreenProps<RootStackParamList, 'RetypePin'>;

const RetypePin = (props: RetypePinProps) => {
  const navigation = useNavigation();
  const { pin: newPin } = props.route.params;
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const userHasPin = useSelector(hasPin);

  const onSubmit = (pin: string) => {
    if (newPin === pin) {
      if (userHasPin === true) {
        updatePin({ newPin: pin, oldPin: props.route.params.oldPin! }).then(
          () => {
            Keychain.setGenericPassword(user!.username, pin, {
              service: 'tourees',
              accessControl:
                Keychain.ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE,
            })
              .then(() => {
                dispatch(setHasPin(true));
                notifyMessage(t('successful'), t('pin.success'));
                navigation.navigate('HomeTab', { screen: 'Profile' });
              })
              .catch(_error => {
                notifyMessage(t('error'), t('pin.errorSaving'));
              });
          },
        );
      } else {
        createPin({ newPin: pin }).then(() => {
          Keychain.setGenericPassword(user!.username, pin, {
            service: 'tourees',
            accessControl:
              Keychain.ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE,
          })
            .then(() => {
              dispatch(setHasPin(true));
              dispatch(enableBiometric());
              navigation.navigate('HomeTab', { screen: 'Home' });
            })
            .catch(_error => {
              notifyMessage(t('error'), t('pin.errorSaving'));
            });
        });
      }
    } else {
      notifyMessage(t('error'), t('pin.mismatch'));
    }
  };

  return (
    <CustomKeyboardAvoidingView>
      <CustomSafeAreaView>
        <Pin title={t('pin.retype')} onSubmit={onSubmit} />
      </CustomSafeAreaView>
    </CustomKeyboardAvoidingView>
  );
};

export default RetypePin;
