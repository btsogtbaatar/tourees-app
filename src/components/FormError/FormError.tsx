import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';
import { colors, Typography } from '../../theme';
import FormErrorStyle from './FormError.style';

export interface FormErrorProps {
  error?: string;
}

const FormError = (props: FormErrorProps) => {
  const { t } = useTranslation();

  return (
    <Text
      style={[
        { ...Typography.textSmall, color: colors.danger },
        FormErrorStyle.container,
      ]}>
      {props.error ?? t('error')}
    </Text>
  );
};

export default FormError;
