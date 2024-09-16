import { StyleSheet } from 'react-native';
import { colors, FontWeight, getFontWeight, Typography } from '../../theme';

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
  titleContainer: {
    flex: 1,
  },
  image: {
    borderRadius: 10,
    marginRight: 10,
    overflow: 'hidden',
  },
  title: {
    ...Typography.textRegular,
    ...getFontWeight(FontWeight.bold),
    lineHeight: 20,
  },
  subtitle: {
    ...Typography.textSmaller,
    color: colors.primaryGradient,
  },
});
