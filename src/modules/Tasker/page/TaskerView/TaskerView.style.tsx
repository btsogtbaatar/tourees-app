import { StyleSheet } from 'react-native';
import {
  FontWeight,
  getFontWeight,
  Typography,
} from '../../../../theme/typography';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../../utilities';
import { colors } from '../../../../theme/colors';

export const TaskerViewStyle = StyleSheet.create({
  headerLabael: {
    ...Typography.textLarge,
    ...getFontWeight(FontWeight.extraBold),
    marginBottom: verticalScale(6),
  },

  label: {
    ...Typography.textRegular,
    ...getFontWeight(FontWeight.semiBold),
    marginTop: verticalScale(8),
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
});
