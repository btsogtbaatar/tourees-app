import { StyleSheet } from 'react-native';
import { colors, FontWeight, getFontWeight, Typography } from '../../theme';
import { verticalScale } from '../../utilities';

export const CustomButtonStyle = StyleSheet.create({
  button: {
    borderRadius: verticalScale(16),
    paddingHorizontal: 16,
    height: verticalScale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...Typography.textRegular,
    color: colors.white,
    ...getFontWeight(FontWeight.bold),
  },
});
