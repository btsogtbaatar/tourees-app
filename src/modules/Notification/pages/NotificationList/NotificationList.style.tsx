import { StyleSheet } from 'react-native';
import { colors, Typography } from '../../../../theme';
import { verticalScale } from '../../../../utilities';

export const NotificationListStyle = StyleSheet.create({
  container: { backgroundColor: 'white', flex: 1 },
  emptyText: {
    ...Typography.textSmall,
    color: colors.gray300,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginVertical: verticalScale(16),
  },
  footerContainer: { justifyContent: 'center', alignItems: 'center' },
});
