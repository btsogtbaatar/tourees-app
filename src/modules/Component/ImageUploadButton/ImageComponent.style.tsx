import { StyleSheet } from 'react-native';
import { verticalScale, horizontalScale } from '../../../uitls/metrics';
import { Colors } from '../../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height: verticalScale(109),
    borderRadius: horizontalScale(16),
    borderWidth: 1,
    borderColor: Colors.borderColor,
    marginVertical: verticalScale(8),
    marginHorizontal: horizontalScale(8),
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    borderRadius: 16,
  },
  imageBackContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  br16: {
    borderRadius: 16,
  },
  imageTitle: {
    color: Colors.textWhite,
    fontSize: 24,
    lineHeight: 33,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default styles;
