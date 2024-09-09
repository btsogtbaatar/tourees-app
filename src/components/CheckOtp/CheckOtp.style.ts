import { StyleSheet } from 'react-native';
import { colors, Typography } from '../../theme';
import { horizontalScale, verticalScale } from '../../utilities';

const CheckOtpStyle = StyleSheet.create({
  titleContainer: {
    paddingHorizontal: horizontalScale(14),
    alignItems: 'center',
    marginTop: verticalScale(30),
  },
  title: {
    ...Typography.textSmall,
    textAlign: 'center',
  },
  highlight: { color: colors.primaryGradient },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 2,
  },
  resend: {
    ...Typography.textSmall,
  },
});

export default CheckOtpStyle;
