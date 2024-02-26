import { StyleSheet } from 'react-native';
import { Colors } from '../../../../../../../constants/Colors';
import { verticalScale } from '../../../../../../uitls/metrics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.textWhite,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    padding: verticalScale(16),
    paddingTop: 0,
  },
});

export default styles;
