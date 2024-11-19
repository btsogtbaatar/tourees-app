import { StyleSheet } from 'react-native';
import { colors } from '../../theme';
import { horizontalScale, verticalScale } from '../../utilities';

const CustomCheckBoxStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    alignContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    gap: horizontalScale(8),
    alignItems: 'center',
    paddingVertical: verticalScale(2),
  },
  active: {
    backgroundColor: colors.primaryGradient,
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
