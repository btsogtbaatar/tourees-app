import { StyleSheet } from 'react-native';
import { horizontalScale, moderateScale, verticalScale } from '../../utilities';
import { colors, FontWeight, getFontWeight, Typography } from '../../theme';

export const RemarkListStyle = StyleSheet.create({
  header: {
    marginTop: verticalScale(8),
  },
  label: {
    ...Typography.textRegular,
    ...getFontWeight(FontWeight.semiBold),
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: moderateScale(8),
    columnGap: moderateScale(8),
    marginTop: verticalScale(8),
  },
  plusButton: {
    borderRadius: moderateScale(8),
    backgroundColor: colors.gray100,
    paddingHorizontal: verticalScale(12),
    height: verticalScale(30),
    justifyContent: 'center',
  },
  title: {
    ...Typography.textSmall,
    ...getFontWeight(FontWeight.medium),
    textAlign: 'center',
  },
});
