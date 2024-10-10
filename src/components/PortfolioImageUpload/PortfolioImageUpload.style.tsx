import { StyleSheet } from 'react-native';
import { Typography, getFontWeight, FontWeight, colors } from '../../theme';
import { verticalScale } from '../../utilities';

export const PortfolioImageUploadStyle = StyleSheet.create({
  header: {
    marginTop: verticalScale(8),
  },
  label: {
    ...Typography.textRegular,
    ...getFontWeight(FontWeight.semiBold),
  },
  plusBtn: {
    flex: 1,
    alignItems: 'center',
    height: verticalScale(50),
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.borderColor,
    justifyContent: 'center',
  },
});
