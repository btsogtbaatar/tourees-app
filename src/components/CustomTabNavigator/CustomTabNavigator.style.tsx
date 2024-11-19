import { StyleSheet } from 'react-native';
import { FontWeight, getFontWeight, Typography } from '../../theme';

export const CustomTabNavigatorStyle = StyleSheet.create({
  headerLabel: {
    ...Typography.textRegular,
    ...getFontWeight(FontWeight.bold),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
});
