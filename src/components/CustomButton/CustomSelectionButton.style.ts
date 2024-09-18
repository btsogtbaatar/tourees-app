import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

const CustomSelectionStyle = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 16,
    borderWidth: 1,
  },
  inActive: {
    borderColor: colors.borderColor,
  },
  active: {
    borderColor: colors.borderPrimaryColor,
    backgroundColor: colors.placeColor,
  },
});
export default CustomSelectionStyle;
