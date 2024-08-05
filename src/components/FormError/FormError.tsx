import React from 'react';
import { Text } from 'react-native';
import { colors, Typography } from '../../theme';
import FormErrorStyle from './FormError.style';

export interface FormErrorProps {
  error?: string;
}

const FormError = (props: FormErrorProps) => {
  return (
    <Text
      style={[
        { ...Typography.textSmall, color: colors.danger },
        FormErrorStyle.container,
      ]}>
      {props.error ?? 'Алдаа'}
    </Text>
  );
};

export default FormError;
