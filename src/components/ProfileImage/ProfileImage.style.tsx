import { StyleSheet } from 'react-native';
import { colors } from '../../theme';
import { horizontalScale, moderateScale, verticalScale } from '../../utilities';

export const ProfileImageStyle = StyleSheet.create({
  container: {
    width: horizontalScale(84),
    height: horizontalScale(84),
    borderRadius: moderateScale(40),
    backgroundColor: 'white',
  },
  image: {
    width: horizontalScale(84),
    height: horizontalScale(84),
    justifyContent: 'center',
    alignItems: 'center',
  },
  editBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: moderateScale(2.6),
    borderColor: colors.borderColor,
    borderRadius: moderateScale(50),
    backgroundColor: colors.borderColor,
  },
  picture: {
    borderRadius: moderateScale(40),
  },
});
