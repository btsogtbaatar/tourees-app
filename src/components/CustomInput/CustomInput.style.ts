import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export const CustomInputStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.textWhite,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    height: 52,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  input: {
    padding: 0,
    margin: 0,
  },
});
