import { StyleSheet } from 'react-native';
import { colors } from '../../constants';

const styles = StyleSheet.create({
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
  dividerText: { fontWeight: '700', fontFamily: 'Nunito', textAlign:'center' },
});
export default styles;