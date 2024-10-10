import { StyleSheet } from 'react-native';
import { verticalScale } from '../../../../utilities';
import { Typography, getFontWeight, FontWeight } from '../../../../theme';

export const RegisterProfileStyle = StyleSheet.create({
  formItem: {
    marginTop: verticalScale(20),
  },
  label: {
    ...Typography.textSmall,
    ...getFontWeight(FontWeight.bold),
    marginBottom: 8,
  },
});
