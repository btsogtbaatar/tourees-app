import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

const createStyles = StyleSheet.create({
  btn: {
    borderRadius: 12,
    backgroundColor: colors.primaryColor,
    paddingHorizontal: 16,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  icon: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  disabled: {
    backgroundColor: colors.disabledColor,
  },
  btnTextStyle: {
    color: colors.textWhite,
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'Nunito',
  },
  container: {
    padding: 16,
    alignItems: 'flex-start',
    gap: 16,
    borderTopStartRadius: 28,
    borderTopEndRadius: 28,
    flexDirection: 'row',
  },
});

export default createStyles;
