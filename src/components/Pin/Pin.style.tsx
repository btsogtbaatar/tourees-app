import { StyleSheet } from 'react-native';
import { FontWeight, getFontWeight, Typography } from '../../theme';
import { horizontalScale, verticalScale } from '../../utilities';

const PinStyle = StyleSheet.create({
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
})

export default PinStyle;