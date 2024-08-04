import { StyleSheet } from 'react-native';

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
  medium: weight;
  semiBold: weight;
  bold: weight;
  extraBold: weight;
} = {
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
};

const fontFamily = 'Nunito';

export const Typography = StyleSheet.create({
  textLarge: {
    fontFamily: fontFamily,
    fontSize: 20,
    lineHeight: 30,
  },
  textRegular: {
    fontFamily: fontFamily,
    fontSize: 16,
    lineHeight: 24,
  },
  textSmall: {
    fontFamily: fontFamily,
    fontSize: 14,
    lineHeight: 20,
  },
  textSmaller: {
    fontFamily: fontFamily,
    fontSize: 12,
    lineHeight: 18,
  },
  textSmallest: {
    fontFamily: fontFamily,
    fontSize: 10,
    lineHeight: 16,
  },
});
