import { StyleSheet } from 'react-native';
import { colors, FontWeight, Typography } from '../../constants';

export const AddressCardStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginTop: 10,
    borderWidth: 1,
  },
  selected: {
    borderColor: colors.primaryColor,
  },
  unselected: {
    borderColor: 'transparent',
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
    height: 40,
    justifyContent: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    marginRight: 10,
  },
  addressText: {
    ...Typography.textSmaller,
    fontWeight: FontWeight.medium,
  },
  selectedText: {
    color: colors.gray600,
  },
  unselectedText: {
    color: colors.gray300,
  },
});
