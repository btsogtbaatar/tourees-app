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
  textSmallBold: {
    fontFamily: 'Nunito',
    fontSize: 14,
    fontWeight: FontWeight.bold,
    lineHeight: 21,
  },
  textRegularSemiBold: {
    fontFamily: 'Nunito',
    fontWeight: FontWeight.semiBold,
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: 'center',
    color: colors.gray700,
  },
  textSmallerMedium: {
    fontFamily: 'Nunito',
    fontWeight: FontWeight.medium,
    fontSize: 12,
    lineHeight: 18,
    color: colors.gray300,
  },
});
