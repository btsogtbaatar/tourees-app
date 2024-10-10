import { StyleSheet } from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utilities/metrics';
import { colors } from '../../theme/colors';
import { FontWeight, getFontWeight, Typography } from '../../theme/typography';

export const RemarkTextViewStyle = StyleSheet.create({
  container: {
    rowGap: 8,
    marginBottom: 8,
  },
  plusButton: {
    borderRadius: moderateScale(8),
    backgroundColor: colors.gray100,
    paddingHorizontal: verticalScale(12),
    height: verticalScale(30),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    ...Typography.textSmall,
    ...getFontWeight(FontWeight.medium),
    textAlign: 'center',
  },
  textContainer: {
    rowGap: verticalScale(8),
  },
  label: {
    ...Typography.textLarge,
    ...getFontWeight(FontWeight.semiBold),
  },
  text: {
    ...Typography.textRegular,
    ...getFontWeight(FontWeight.regular),
    marginLeft: horizontalScale(12),
  },
  listTextContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: moderateScale(8),
    columnGap: moderateScale(8),
    marginTop: verticalScale(8),
  },
});
