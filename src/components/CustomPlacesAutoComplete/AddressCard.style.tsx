import { StyleSheet } from 'react-native';
import { colors, Typography } from '../../theme';

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
    borderColor: colors.primary500,
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
  },
  selectedText: {
    color: colors.gray600,
  },
  unselectedText: {
    color: colors.gray300,
  },
});
