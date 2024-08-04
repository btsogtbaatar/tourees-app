import { StyleSheet } from 'react-native';
import { colors, FontWeight, getFontWeight, Typography } from '../../theme';

const ImageItemStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 10,
    width: 100,
    borderRadius: 12,
  },
  image: {
    width: '100%',
    height: 40,
    marginVertical: 5,
  },
  title: {
    ...Typography.textSmaller,
    ...getFontWeight(FontWeight.bold),
    color: colors.textColor,
    textAlign: 'center',
    height: Typography.textSmaller.lineHeight * 2,
  },
});

export default ImageItemStyle;
