import { StyleSheet } from 'react-native';
import {
  colors,
  FontWeight,
  getFontWeight,
  Typography,
} from '../../../../theme';
import { horizontalScale, verticalScale } from '../../../../utilities';

export const RegisterOtpCheckStyle = StyleSheet.create({
  message: {
    paddingHorizontal: horizontalScale(14),
    alignItems: 'center',
    marginTop: verticalScale(30),
  },
  messageText: {
    textAlign: 'center',
  },
  innerContainer: {
    flex: 1,
  },
  otpContainer: {
    marginVertical: verticalScale(50),
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendContainer: {
    marginLeft: 5,
  },
  resend: {
    ...Typography.textSmall,
    ...getFontWeight(FontWeight.bold),
    color: colors.primaryGradient,
  },
});
