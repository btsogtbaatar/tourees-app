import { StyleSheet } from 'react-native';
import { colors, Typography } from '../../theme';

const TextItemStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 5,
  },
  placeholder: {
    ...Typography.textSmaller,
    flex: 1,
    color: colors.gray200,
  },
  label: {
    ...Typography.textSmaller,
    flex: 1,
  },
  action: {
    color: colors.primaryGradient,
  },
});

export default TextItemStyle;
