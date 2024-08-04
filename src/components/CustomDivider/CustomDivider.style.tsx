import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

const CustomDividerStyle = StyleSheet.create({
  dividerContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
    margin: 16,
  },
  dividerLine: {
    flex: 1,
    borderWidth: 1,
    height: 1,
    alignSelf: 'center',
    borderColor: colors.brandGray,
  },
  dividerText: { textAlign: 'center' },
});
export default CustomDividerStyle;
