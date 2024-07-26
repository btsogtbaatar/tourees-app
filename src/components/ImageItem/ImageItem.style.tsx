import { StyleSheet } from 'react-native';
import { colors, FontWeight, Typography } from '../../constants';

const ImageItemStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 10,
    width: 100,
    borderRadius: 12,
    flex: 1,
  },
  image: {
    width: '100%',
    height: 40,
    marginVertical: 5,
  },
  title: {
    ...Typography.textSmaller,
    fontWeight: FontWeight.bold,
    color: colors.textColor,
    textAlign: 'center',
  },
});

export default ImageItemStyle;
