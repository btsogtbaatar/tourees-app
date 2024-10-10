import { StyleSheet } from 'react-native';
import { colors, FontWeight, getFontWeight, Typography } from '../../theme';

export const NotificationStyle = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.gray100
  },
  title: {
    ...Typography.textRegular,
    ...getFontWeight(FontWeight.bold),
  },
  description: {
    ...Typography.textSmall,
    color: colors.gray400,
    flexGrow: 1,
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
    flexShrink: 1
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primaryGradient,
  },
  subtitle: {
    ...Typography.textSmaller,
    color: colors.gray400,
  }
});
