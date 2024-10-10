import { StyleSheet } from 'react-native';
import { Typography } from '../../../../theme';

export const TaskBudgetStyle = StyleSheet.create({
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instruction: {
    ...Typography.textSmall,
    textAlign: 'center',
  },
});
