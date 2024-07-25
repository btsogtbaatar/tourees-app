import { StyleSheet } from 'react-native';
import { colors, FontWeight, Typography } from '../../constants';

export const SelectedPlaceStyles = StyleSheet.create({
  selectedAddressContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginTop: 10,
    borderColor: colors.primaryColor,
    borderWidth: 1,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
    height: 40,
    justifyContent: 'center',
  },
  selectedAddressLabel: {
    ...Typography.textSmaller,
    color: colors.primaryColor,
    fontWeight: FontWeight.bold,
    marginBottom: 5,
  },
  iconContainer: {
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedAddress: {
    ...Typography.textSmaller,
    color: colors.gray600,
    fontWeight: FontWeight.medium,
  },
  unselectedAddress: {
    ...Typography.textSmaller,
    color: colors.gray300,
    fontWeight: FontWeight.medium,
  },
  actionContainer: {
    paddingLeft: 10,
    justifyContent: 'center',
    borderLeftWidth: 0.5,
    borderLeftColor: colors.borderColor,
  },
  action: {
    height: 20,
    color: colors.danger,
  },
});
