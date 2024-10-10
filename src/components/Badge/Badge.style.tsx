import { StyleSheet } from 'react-native';
import { colors, Typography } from '../../theme';

export const BadgeStyle = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.danger,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...Typography.textSmallest,
    color: colors.white,
  },
});
