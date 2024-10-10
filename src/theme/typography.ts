import { Platform, StyleSheet } from 'react-native';
import { colors } from './colors';

type weight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | undefined;

export const FontWeight: {
  extraLight: weight;
  light: weight;
  regular: weight;
  medium: weight;
  semiBold: weight;
  bold: weight;
  extraBold: weight;
} = {
  extraLight: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
};

export const getFontWeight = (weight: weight) => {
  if (Platform.OS === 'ios') {
    return { fontWeight: weight };
  } else if (Platform.OS === 'android') {
    let fontWeight;

    switch (weight) {
      case '200':
        fontWeight = 'ExtraLight';
        break;
      case '300':
        fontWeight = 'Light';
        break;
      case '400':
      case 'normal':
        fontWeight = 'Regular';
        break;
      case '500':
        fontWeight = 'Medium';
        break;
      case '600':
        fontWeight = 'SemiBold';
        break;
      case 'bold':
      case '700':
        fontWeight = 'Bold';
        break;
      case 'bold':
      case '800':
        fontWeight = 'ExtraBold';
        break;
      default:
        fontWeight = 'Medium';
        break;
    }

    return { fontFamily: 'Nunito-' + fontWeight };
  }
};

export const fontFamily = 'Nunito';

export const Typography = StyleSheet.create({
  textExtraLarge: {
    color: colors.gray700,
    fontFamily: fontFamily,
    fontSize: 32,
    lineHeight: 40,
    ...getFontWeight(FontWeight.medium),
  },
  textLarge: {
    color: colors.gray700,
    fontFamily: fontFamily,
    fontSize: 24,
    lineHeight: 32,
    ...getFontWeight(FontWeight.medium),
  },
  textRegular: {
    color: colors.gray700,
    fontFamily: fontFamily,
    fontSize: 16,
    lineHeight: 24,
    ...getFontWeight(FontWeight.medium),
  },
  textSmall: {
    color: colors.gray700,
    fontFamily: fontFamily,
    fontSize: 14,
    lineHeight: 20,
    ...getFontWeight(FontWeight.medium),
  },
  textSmaller: {
    color: colors.gray700,
    fontFamily: fontFamily,
    fontSize: 12,
    lineHeight: 18,
    ...getFontWeight(FontWeight.medium),
  },
  textSmallest: {
    color: colors.gray700,
    fontFamily: fontFamily,
    fontSize: 10,
    lineHeight: 16,
    ...getFontWeight(FontWeight.medium),
  },
  textSmallestColorless: {
    fontFamily: fontFamily,
    fontSize: 10,
    lineHeight: 16,
    ...getFontWeight(FontWeight.medium),
  },
});
