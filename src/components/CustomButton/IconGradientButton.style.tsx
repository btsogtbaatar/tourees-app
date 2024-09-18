import { StyleSheet } from 'react-native';
import { verticalScale } from '../../utilities';

export const IconGradientButtonStyle = StyleSheet.create({
  button: {
    borderRadius: verticalScale(16),
    height: verticalScale(40),
    width: verticalScale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
