import { StyleSheet } from 'react-native';
import {
  colors,
  FontWeight,
  getFontWeight,
  Typography,
} from '../../../../theme';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../../utilities/metrics';

const TaskerServiceViewStyle = StyleSheet.create({
  nameStyle: {
    ...Typography.textLarge,
    ...getFontWeight(FontWeight.bold),
  },
  addressStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
    paddingRight: horizontalScale(8),
    marginTop: verticalScale(8),
  },
  packageContainer: {
    backgroundColor: colors.placeColor,
    padding: verticalScale(8),
    alignItems: 'center',
    borderRadius: verticalScale(16),
    marginVertical: verticalScale(8),
  },
  contactContainer: {
    backgroundColor: colors.primary100,
    padding: verticalScale(8),
    alignItems: 'center',
    borderRadius: verticalScale(16),
    marginVertical: verticalScale(8),
    alignSelf: 'center',
  },
  contactText: {
    color: colors.primary500,
    ...getFontWeight(FontWeight.medium),
  },
});

export default TaskerServiceViewStyle;
