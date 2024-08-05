import { StyleSheet } from 'react-native';
import { colors, FontWeight, getFontWeight, Typography } from '../../theme';

const ImageItemStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 10,
    alignItems: 'center',
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  image: {
    height: 20,
    width: 20,
    marginVertical: 5,
  },
  title: {
    ...Typography.textSmaller,
    ...getFontWeight(FontWeight.bold),
    alignSelf: 'center',
    color: colors.textColor,
    textAlign: 'center',
  },
});

export default ImageItemStyle;
