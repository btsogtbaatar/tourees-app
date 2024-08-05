import { StyleSheet } from 'react-native';
import { horizontalScale, verticalScale } from '../../utilities';
import { colors } from '../../theme';

const CheckOtpStyle = StyleSheet.create({
  title: {
    paddingHorizontal: horizontalScale(14),
    alignItems: 'center',
    marginTop: verticalScale(30),
  },
  email: {
    textAlign: 'center',
  },
  highlight: { color: colors.primary500 },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 2,
  },
});

export default CheckOtpStyle;
