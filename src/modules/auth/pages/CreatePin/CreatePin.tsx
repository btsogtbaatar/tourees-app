import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomKeyboardAvoidingView from '../../../../components/CustomKeyboardAvoidingView/CustomKeyboardAvoidingView';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import Pin from '../../../../components/Pin/Pin';
import { RootStackParamList } from '../../../../navigation/types';

type CreatePinProps = NativeStackScreenProps<RootStackParamList, 'CreatePin'>;

const CreatePin = (props: CreatePinProps) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const onSubmit = (pin: string) => {
    navigation.navigate('RetypePin', {
      pin,
      oldPin: props.route.params.oldPin,
    });
  };

  return (
    <CustomKeyboardAvoidingView>
      <CustomSafeAreaView>
        <Pin title={t('pin.createPin')} onSubmit={onSubmit} />
      </CustomSafeAreaView>
    </CustomKeyboardAvoidingView>
  );
};

export default CreatePin;
