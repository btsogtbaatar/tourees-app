import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 12,
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.brandGray,
  },
  icon: {
    width: 30,
    height: 30,
  },
  text: {
    fontFamily: 'Nunito',
    fontWeight: '700',
  },
});

export default styles;
