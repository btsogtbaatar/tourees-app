import { StyleSheet } from 'react-native';
import { colors } from '../../../../constants/colors';
import { verticalScale } from '../../../../utilities/metrics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.textWhite,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    padding: verticalScale(16),
    paddingTop: 0,
  },
});

export default styles;