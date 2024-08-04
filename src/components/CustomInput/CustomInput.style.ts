import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const CustomInputStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    minHeight: 40,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  input: {
    color: colors.gray700,
    textAlignVertical: 'center',
    flex: 1,
    padding: 0,
    margin: 0,
  },
  inputContainer: { flexDirection: 'row', alignItems: 'center' },
  containerWithSuggestion: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  icon: {
    marginRight: 10,
  },
  action: {
    flexDirection: 'column',
  },
});
