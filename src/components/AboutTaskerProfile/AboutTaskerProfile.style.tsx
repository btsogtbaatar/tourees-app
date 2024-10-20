import { StyleSheet } from 'react-native';
import { colors, FontWeight, getFontWeight, Typography } from '../../theme';

const AboutTaskerProfileStyle = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameStyle: {
    ...Typography.textRegular,
    ...getFontWeight(FontWeight.bold),
  },
  statusStyle: {
    color: colors.gray500,
  },
});

export default AboutTaskerProfileStyle;
