import { StyleSheet } from 'react-native';
import { FontWeight, getFontWeight, Typography } from '../../../../theme';
import { colors } from '../../../../theme/colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../../utilities/metrics';

const TaskerSearchStyles = StyleSheet.create({
  subCategoryContainer: {
    borderTopColor: colors.borderColor,
    borderWidth: 1,
    borderColor: colors.transparent,
    marginTop: verticalScale(8),
  },
  subCategoryTitle: {
    marginVertical: verticalScale(8),
    ...Typography.textLarge,
    ...getFontWeight(FontWeight.bold),
  },
  serviceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  serviceNameTitle: {
    ...Typography.textRegular,
    ...getFontWeight(FontWeight.semiBold),
  },
  imageContainer: {
    borderRadius: 16,
    marginRight: 10,
    overflow: 'hidden',
  },
  mBottom16: {
    marginBottom: verticalScale(16),
  },
  mTop8: {
    marginTop: verticalScale(8),
  },
  nameTitle: {
    ...Typography.textSmall,
    ...getFontWeight(FontWeight.light),
  },
  nameContainer: {
    flexDirection: 'row',
  },
  rateStyles: {
    marginLeft: horizontalScale(8),
    ...Typography.textSmall,
    color: colors.success,
    ...getFontWeight(FontWeight.semiBold),
  },
  sortContainer: {
    paddingVertical: verticalScale(4),
    paddingHorizontal: horizontalScale(12),
    borderRadius: moderateScale(16),
    flexDirection: 'row',
    alignItems: 'center',
    gap: verticalScale(4),
  },
});

export default TaskerSearchStyles;
