import { HeaderBackButtonProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ArrowLeftIcon } from '../Icon';

interface CustomHeaderBackButtonProps extends HeaderBackButtonProps {
  color?: string;
  navigation: any;
}

function CustomHeaderBackButton(props: Readonly<CustomHeaderBackButtonProps>) {
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.goBack();
      }}>
      <ArrowLeftIcon color={props.color} />
    </TouchableOpacity>
  );
}
export default CustomHeaderBackButton;
