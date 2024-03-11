import { Dimensions } from 'react-native';

export const { width, height, fontScale } = Dimensions.get('screen');

const baseWidth = 375;
const baseHeight = 667;


const verticalScale = (size: number) => (height / baseHeight) * size;
const horizontalScale = (size: number) => (width / baseWidth) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

export { verticalScale, horizontalScale, moderateScale };
