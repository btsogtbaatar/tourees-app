import { StyleSheet } from 'react-native';
import { Colors } from '../../../../constants/Colors';
import { Theme } from '@react-navigation/native';

const createStyles = StyleSheet.create({
  btn: {
    borderRadius: 12,
    backgroundColor: Colors.primaryColor,
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
    borderColor: Colors.borderColor,
  },
  disabled: {
    backgroundColor: Colors.disabledColor,
  },
  btnTextStyle: {
    color: Colors.textWhite,
    fontSize: 13,
    fontWeight: '700',
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
