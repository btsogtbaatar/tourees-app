import { StyleSheet } from 'react-native';
import {
  colors,
  FontWeight,
  getFontWeight,
  Typography,
} from '../../../../theme';
import { horizontalScale, verticalScale } from '../../../../utilities';

export const CreatePinStyle = StyleSheet.create({
  titleContainer: {
    paddingHorizontal: horizontalScale(14),
    alignItems: 'center',
    marginTop: verticalScale(30),
  },
  title: {
    ...Typography.textSmall,
    ...getFontWeight(FontWeight.bold),
    textAlign: 'center',
    height: 50,
  },
  email: {
    textAlign: 'center',
  },
  highlight: { color: colors.primaryGradient },
});
