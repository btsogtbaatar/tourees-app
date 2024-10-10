import { StyleSheet } from 'react-native';
import { Typography } from '../../../../theme';

export const TaskListStyle = StyleSheet.create({
  empty: {
    ...Typography.textRegular,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seperator: {
    marginTop: 12,
  },
});
