import { Dimensions } from "react-native";

export const {width, height} = Dimensions.get('window');

const baseWidth = 390;
const baseHeight = 844;

const verticalScale = (size: number) => (height / baseHeight) * size;
const horizontalScale = (size: number) => (width / baseWidth) * size;
const moderateScale = (size: number, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

export {verticalScale, horizontalScale, moderateScale};

