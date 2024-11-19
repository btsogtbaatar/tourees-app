import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import CustomKeyboardAvoidingView from '../../../../components/CustomKeyboardAvoidingView/CustomKeyboardAvoidingView';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import { notifyMessage } from '../../../../components/CustomToast/CustomToast';
import Loading from '../../../../components/Loading/Loading';
import Pin from '../../../../components/Pin/Pin';
import { useAppDispatch } from '../../../../context/app/store';
import { RootStackParamList } from '../../../../navigation/types';
import { storeCredentials } from '../../../../utilities/biometric';
import { enableBiometric } from '../../../Shared/slice/preferenceSlice';
import { createPin, updatePin } from '../../services';
import { hasPin, selectUser, setHasPin } from '../../slice/authSlice';

type RetypePinProps = NativeStackScreenProps<RootStackParamList, 'RetypePin'>;

const RetypePin = (props: RetypePinProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();
  const { pin: newPin } = props.route.params;
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const userHasPin = useSelector(hasPin);

  const onSubmit = (pin: string) => {
    if (newPin === pin) {
      setLoading(true);
      if (userHasPin === true) {
        updatePin({ newPin: pin, oldPin: props.route.params.oldPin! }).then(
          () => {
            storeCredentials(user!.username, pin)
              .then(() => {
                dispatch(setHasPin(true));
                notifyMessage(t('successful'), t('pin.success'));
                navigation.navigate('HomeTab', { screen: 'Profile' });
              })
              .catch(_error => {
                notifyMessage(t('error'), t('pin.errorSaving'));
              })
              .finally(() => setLoading(false));
          },
        );
      } else {
        createPin({ newPin: pin }).then(() => {
          storeCredentials(user!.username, pin)
            .then(() => {
              dispatch(setHasPin(true));
              dispatch(enableBiometric());
              navigation.navigate('HomeTab', { screen: 'Home' });
            })
            .catch(_error => {
              notifyMessage(t('error'), t('pin.errorSaving'));
            })
            .finally(() => setLoading(false));
        });
      }
    } else {
      notifyMessage(t('error'), t('pin.mismatch'));
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <CustomKeyboardAvoidingView>
      <CustomSafeAreaView>
        <Pin title={t('pin.retype')} onSubmit={onSubmit} />
      </CustomSafeAreaView>
    </CustomKeyboardAvoidingView>
  );
};

export default RetypePin;
