import { StyleSheet } from 'react-native';
import { colors, FontWeight, Typography } from '../../theme';

const BannerStyle = StyleSheet.create({
  container: {
    padding: 12,
    paddingRight: 10,
    borderRadius: 12,
    flexDirection: 'row',
  },
  title: {
    ...Typography.textSmall,
    color: colors.white,
    fontWeight: FontWeight.bold,
    flex: 1,
  },
});

export default BannerStyle;
