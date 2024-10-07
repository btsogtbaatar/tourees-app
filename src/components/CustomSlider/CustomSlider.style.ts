import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';

const CustomSliderStyles = StyleSheet.create({
  container: {
    margin: 20,
    alignItems: 'center',
  },
  label: {
    ...Typography.textSmall,
    color: colors.gray700,
    marginBottom: 10,
  },
  sliderContainer: {
    width: '100%',
    alignItems: 'center',
    position: 'relative',
  },
  sliderTrack: {
    height: 4,
    backgroundColor: '#d3d3d3',
    borderRadius: 2,
    justifyContent: 'center',
    position: 'relative',
  },
  thumb: {
    position: 'absolute',
    top: -8,
    width: 20,
    height: 20,
    backgroundColor: colors.borderPrimaryColor,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },

  
});
export default CustomSliderStyles;
