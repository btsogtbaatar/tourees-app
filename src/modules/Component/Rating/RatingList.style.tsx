import { StyleSheet } from 'react-native';
import { horizontalScale } from '../../../uitls/metrics';
import { Colors } from '../../../../constants/Colors';

const styles = StyleSheet.create({
  ratingH: {
    marginHorizontal: horizontalScale(1),
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  ratingText: {
    color: Colors.gray300,
    marginLeft: horizontalScale(8),
    fontWeight: '700',
    lineHeight: 15,
    fontSize: 11,
  },
});

export default styles;
