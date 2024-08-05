import { StyleSheet } from 'react-native';
import { horizontalScale, verticalScale } from '../../utilities';

const OtpInputGroupStyle = StyleSheet.create({
  container: {
    marginVertical: verticalScale(50),
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  wrapper: {
    display: 'flex',
    flex: 1,
    gap: horizontalScale(8),
  },
  digits: {
    width: horizontalScale(64),
    height: horizontalScale(64),
  },
});

export default OtpInputGroupStyle;
