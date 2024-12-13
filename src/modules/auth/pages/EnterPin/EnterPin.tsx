import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import CustomKeyboardAvoidingView from '../../../../components/CustomKeyboardAvoidingView/CustomKeyboardAvoidingView';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import Loading from '../../../../components/Loading/Loading';
import Pin from '../../../../components/Pin/Pin';
import { useAppDispatch } from '../../../../context/app/store';
import { RootStackParamList } from '../../../../navigation/types';
import { storeCredentials } from '../../../../utilities/biometric';
import { toastError } from '../../../../utilities/toast';
import { enableBiometric } from '../../../Shared/slice/preferenceSlice';
import { tokenCredentials } from '../../services';
import { selectUser } from '../../slice/authSlice';

type EnterPinProps = NativeStackScreenProps<RootStackParamList, 'EnterPin'>;

const EnterPin = (props: EnterPinProps) => {
  const navigation = useNavigation();
  const user = useSelector(selectUser);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = (pin: string) => {
    setLoading(true);
    let credentials = { username: user!.username, password: pin };

    tokenCredentials(credentials)
      .then(() => {
        storeCredentials(credentials.username, credentials.password)
          .then(() => {
            if (props.route.params.authenticating === true) {
              dispatch(enableBiometric());
              navigation.navigate('HomeTab', { screen: 'Home' });
            } else {
              navigation.navigate('CreatePin', { oldPin: pin });
            }
          })
          .catch(_error => {
            toastError(t('pin.errorSaving'));
          })
          .finally(() => setLoading(false));
      })
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <CustomKeyboardAvoidingView>
      <CustomSafeAreaView>
        <Pin title={t('pin.enterPin')} onSubmit={onSubmit} />
      </CustomSafeAreaView>
    </CustomKeyboardAvoidingView>
  );
};

export default EnterPin;
