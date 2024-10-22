import { StyleSheet } from 'react-native';
import { verticalScale } from '../../utilities/metrics';
import { colors, FontWeight, getFontWeight } from '../../theme';

const TaskerServiceListStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(8),
  },
  title: {
    color: colors.primaryGradient,
    ...getFontWeight(FontWeight.semiBold),
  },
  serviceNameStyles: {
    ...getFontWeight(FontWeight.semiBold),
  },
  mTop4: {
    marginTop: verticalScale(4),
  },
});

export default TaskerServiceListStyle;
