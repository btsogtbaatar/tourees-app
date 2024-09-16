import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

const FooterButtonStyle = StyleSheet.create({
  btn: {
    borderRadius: 12,
    backgroundColor: colors.primaryGradient,
    paddingHorizontal: 16,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  backButton: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  icon: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  disabled: {
    backgroundColor: colors.primary100,
  },
  btnTextStyle: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'Nunito',
  },
  container: {
    alignItems: 'flex-start',
    gap: 16,
    borderTopStartRadius: 28,
    borderTopEndRadius: 28,
    flexDirection: 'row',
  },
});

export default FooterButtonStyle;
