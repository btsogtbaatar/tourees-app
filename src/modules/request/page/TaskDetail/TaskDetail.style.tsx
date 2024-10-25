import { StyleSheet } from 'react-native';
import { FontWeight, getFontWeight, Typography } from '../../../../theme';
import { colors } from '../../../../theme/colors';
import { verticalScale } from '../../../../utilities/metrics';

export const TaskDetailStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: verticalScale(16),
    gap: verticalScale(16),
  },
  title: {
    ...Typography.textLarge,
    ...getFontWeight(FontWeight.bold),
  },
  status: {
    ...Typography.textRegular,
    ...getFontWeight(FontWeight.bold),
    color: colors.primaryGradient,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: verticalScale(12),
  },
  col: {
    flexDirection: 'column',
    flex: 1,
  },
  label: {
    ...Typography.textRegular,
    ...getFontWeight(FontWeight.bold),
    color: colors.gray700,
  },
  date: {
    ...Typography.textSmaller,
    color: colors.gray300,
  },
  text: {
    ...Typography.textSmall,
    color: colors.gray700,
  },
  detail: {
    gap: verticalScale(8),
  },
  images: {
    flex: 4,
    marginHorizontal: 'auto',
    width: 400,
  },
  image: {
    flex: 1,
    maxWidth: '25%',
    alignItems: 'center',
  },
  offer: {
    flexDirection: 'column',
    backgroundColor: colors.gray50,
    borderRadius: verticalScale(16),
    padding: verticalScale(16),
    alignItems: 'center',
    gap: verticalScale(8),
    marginVertical: verticalScale(8),
  },
  offerTitle: {
    ...Typography.textSmall,
    color: colors.gray700,
    ...getFontWeight(FontWeight.semiBold), 
  },
  price: {
    ...Typography.textLarge,
    ...getFontWeight(FontWeight.bold),
    color: colors.gray700,
  },
});
