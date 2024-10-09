import { StyleSheet } from 'react-native';
import { Typography, getFontWeight, FontWeight, colors } from '../../theme';
import { horizontalScale, verticalScale } from '../../utilities';

export const HeaderBarStyle = StyleSheet.create({
  title: {
    ...Typography.textRegular,
    ...getFontWeight(FontWeight.bold),
    color: colors.gray700,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(8),
    alignItems: 'center',
  },
});
