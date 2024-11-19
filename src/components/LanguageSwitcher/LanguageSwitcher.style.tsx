import { StyleSheet } from 'react-native';
import { FontWeight, getFontWeight } from '../../theme';

export const LanguageSwitcherStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    textTransform: 'uppercase',
    ...getFontWeight(FontWeight.bold),
  },
});
