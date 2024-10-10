import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { horizontalScale, verticalScale } from '../../utilities';

const ImagePreviewStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height: verticalScale(109),
    borderRadius: horizontalScale(16),
    borderWidth: 1,
    borderColor: colors.borderColor,
    justifyContent: 'center',
  },
  delete: {
    backgroundColor: 'white',
    height: horizontalScale(20),
    width: horizontalScale(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: horizontalScale(20),
    margin: horizontalScale(5),
  },
  imageContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    borderRadius: 16,
    flexDirection: 'row-reverse',
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
    color: colors.white,
    fontSize: 24,
    lineHeight: 33,
    fontWeight: '700',
    textAlign: 'center',
  },
  customContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    borderRadius: 16,
    flexDirection: 'row-reverse',
  },
});

export default ImagePreviewStyle;
