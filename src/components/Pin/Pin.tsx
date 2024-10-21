import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import ContainerView from '../ContainerView/ContainerView';
import CustomGradientButton from '../CustomButton/CustomGradientButton';
import OtpInputGroup from '../OtpInputGroup/OtpInputGroup';
import PinStyle from './Pin.style';

export interface PinProps {
  title: string;
  onSubmit: (pin: string) => void;
}

const Pin = (props: PinProps) => {
  const [pin, setPin] = useState<string>('');
  const { t } = useTranslation();

  return (
    <ContainerView>
      <View style={{ flex: 1 }}>
        <View style={PinStyle.titleContainer}>
          <Text style={PinStyle.title}>{props.title}</Text>
        </View>
        <OtpInputGroup onChange={setPin} secureTextEntry={true} />
      </View>
      <CustomGradientButton
        disabled={pin.length < 4}
        title={t('pin.continue')}
        onPress={() => props.onSubmit(pin)}
      />
    </ContainerView>
  );
};

export default Pin;
