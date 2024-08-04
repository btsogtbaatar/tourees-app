import { StyleSheet } from 'react-native';
import { colors, FontWeight, Typography } from '../../theme';

export const CustomFlatListItemStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 6,
    paddingRight: 12,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  subContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  image: {
    borderRadius: 10,
    marginRight: 10,
    overflow: 'hidden',
  },
  title: {
    ...Typography.textRegular,
    fontWeight: FontWeight.bold,
    lineHeight: 20,
  },
  subtitle: {
    ...Typography.textSmaller,
    fontWeight: FontWeight.medium,
    color: colors.primary500,
  },
});
