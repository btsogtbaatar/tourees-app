import { StyleSheet } from 'react-native';
import { colors, FontWeight, getFontWeight, Typography } from '../../theme';

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
    ...getFontWeight(FontWeight.bold),
    flex: 1,
  },
});

export default BannerStyle;
