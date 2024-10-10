import { StyleSheet } from 'react-native';
import { horizontalScale, moderateScale, verticalScale } from '../../utilities';
import { colors, FontWeight, getFontWeight, Typography } from '../../theme';

export const AvatarModalStyle = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: colors.white,
    paddingVertical: verticalScale(24),
    borderRadius: moderateScale(16),
  },
  titleContainer: {
    marginBottom: verticalScale(12),
    marginHorizontal: verticalScale(16),
  },
  label: {
    ...Typography.textRegular,
    ...getFontWeight(FontWeight.semiBold),
  },
});
