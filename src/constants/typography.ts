import { StyleSheet } from 'react-native';
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
  medium: weight;
  semiBold: weight;
  bold: weight;
} = {
  medium: '500',
  semiBold: '600',
  bold: '700',
};

export const Typography = StyleSheet.create({
  textRegular: {
    fontFamily: 'Nunito',
    fontWeight: FontWeight.semiBold,
    fontSize: 16,
    lineHeight: 24,
    color: colors.gray700,
  },
  textSmall: {
    fontFamily: 'Nunito',
    fontSize: 14,
    lineHeight: 21,
    fontWeight: FontWeight.bold,
  },
  textSmaller: {
    fontFamily: 'Nunito',
    fontWeight: FontWeight.medium,
    fontSize: 12,
    lineHeight: 18,
    color: colors.gray300,
  },
  textSmallMediumWeight: {
    fontFamily: 'Nunito',
    fontWeight: FontWeight.medium,
    lineHeight: 21,
  },
});
