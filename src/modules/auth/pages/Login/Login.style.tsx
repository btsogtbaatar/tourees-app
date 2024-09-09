import { StyleSheet } from 'react-native';
import { horizontalScale, verticalScale } from '../../../../utilities';

const styles = StyleSheet.create({
  socialContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: verticalScale(16),
  },
  buttonContainer: {
    marginTop: verticalScale(16),
    flexDirection: 'row',
    gap: horizontalScale(16),
  },
});

export default styles;
