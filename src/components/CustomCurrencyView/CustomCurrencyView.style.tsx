import { StyleSheet } from 'react-native';
import { verticalScale } from '../../utilities';
import { colors, FontWeight, getFontWeight, Typography } from '../../theme';

const CustomCurrenctViewStyle = StyleSheet.create({
  title: {
    marginTop: verticalScale(8),
    ...Typography.textRegular,
    ...getFontWeight(FontWeight.bold),
    color: colors.textColor,
  },
});

export default CustomCurrenctViewStyle;
