import { StyleSheet } from 'react-native';
import { colors, FontWeight, Typography } from '../../constants';

export const SelectedPlaceStyles = StyleSheet.create({
  selectedAddressContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  selectedAddressLabel: {
    ...Typography.textSmaller,
    color: colors.primaryColor,
    fontWeight: FontWeight.bold,
    marginBottom: 5,
  },
  selectedAddress: {
    ...Typography.textSmaller,
    color: colors.gray600,
    fontWeight: FontWeight.medium,
  },
  actionContainer: {
    paddingLeft: 13,
    justifyContent: 'center',
    borderLeftWidth: 0.5,
    borderLeftColor: colors.borderColor,
  },
  action: {
    height: 20,
    color: colors.danger,
  },
});
