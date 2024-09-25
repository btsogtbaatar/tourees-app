import { StyleSheet } from 'react-native';
import { Typography, getFontWeight, FontWeight, colors } from '../../theme';

export const HeaderBarStyle = StyleSheet.create({
  title: {
    ...Typography.textRegular,
    ...getFontWeight(FontWeight.bold),
    color: colors.gray700,
  },
});
