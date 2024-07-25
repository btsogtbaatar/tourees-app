import { StyleSheet } from 'react-native';
import { verticalScale } from '../../../../utilities';

const styles = StyleSheet.create({
  socialContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: verticalScale(16),
  },
});

export default styles;
