import { StyleSheet } from 'react-native';
import { horizontalScale } from '../../../uitls/metrics';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    padding: horizontalScale(4),
    borderRadius: 10,
    backgroundColor: 'rgba(255, 150, 70, 0.2)',
  },
});

export default styles;
