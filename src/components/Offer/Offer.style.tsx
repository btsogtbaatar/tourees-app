import { StyleSheet } from 'react-native';
import { colors, FontWeight, getFontWeight, Typography } from '../../theme';
import { horizontalScale, verticalScale } from '../../utilities';

export const OfferStyle = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: verticalScale(8),
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: horizontalScale(4),
    justifyContent: 'space-between',
  },
  name: {
    ...Typography.textRegular,
    ...getFontWeight(FontWeight.bold),
  },
  description: {
    ...Typography.textSmall,
    color: colors.gray500,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: horizontalScale(6),
  },
  price: {
    ...Typography.textRegular,
    ...getFontWeight(FontWeight.bold),
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  }
});
