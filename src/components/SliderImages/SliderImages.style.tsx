import { StyleSheet } from 'react-native';
import { horizontalScale, verticalScale } from '../../utilities/metrics';
import { colors } from '../../theme/colors';

const SliderImagesStyles = StyleSheet.create({
  paginationContainer: {
    position: 'absolute',
    bottom: verticalScale(10),
    width: '100%',
    justifyContent: 'center',
    paddingTop: 0,
    paddingBottom: 0,
  },
  dotContainer: {
    width: horizontalScale(10),
    height: verticalScale(10),
    borderRadius: horizontalScale(5),
    backgroundColor: colors.white,
  },
});

export default SliderImagesStyles;
