import { StyleSheet } from 'react-native';
import { verticalScale } from '../../utilities';
import { colors } from '../../theme';

const CustomCheckBoxStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    alignContent: 'center',
  },
  button: {
    paddingVertical: verticalScale(2),
  },
  active: {
    backgroundColor: colors.primary500,
    borderRadius: 5,
    height: verticalScale(16),
    width: verticalScale(16),
  },
  inActive: {
    borderColor: colors.borderPrimaryColor,
    borderWidth: 2,
    borderRadius: 5,
    height: verticalScale(16),
    width: verticalScale(16),
  },
});

export default CustomCheckBoxStyle;
