import { StyleSheet } from 'react-native';
import { FontWeight, getFontWeight, Typography } from '../../theme';
import { colors } from '../../theme/colors';
import { horizontalScale, verticalScale } from '../../utilities/metrics';

const TaskListItemStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: horizontalScale(16),
    paddingHorizontal: horizontalScale(20),
    borderRadius: horizontalScale(16),
    backgroundColor: colors.white,
  },
  left: {
    flex: 1,
    flexDirection: 'column',
  },
  details: {
    flexDirection: 'column',
    gap: verticalScale(8),
    marginVertical: verticalScale(12),
  },
  detailRow: {
    flexDirection: 'row',
    gap: verticalScale(4),
    alignItems: 'center',
  },
  name: {
    ...Typography.textRegular,
    ...getFontWeight(FontWeight.bold),
  },
  info: {
    ...Typography.textSmaller,
  },
  status: {
    ...Typography.textRegular,
    ...getFontWeight(FontWeight.bold),
    color: colors.primaryGradient,
  },
  dot: {
    marginHorizontal: horizontalScale(4),
  },
  infoExtra: {
    ...Typography.textSmall,
    color: colors.gray700,
  },
  price: {
    ...Typography.textLarge,
    ...getFontWeight(FontWeight.bold),
  }
});

export default TaskListItemStyle;
