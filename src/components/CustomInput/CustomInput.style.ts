import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export const CustomInputStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.textWhite,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    minHeight: 52,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  input: {
    textAlignVertical: 'center',
    flex: 1,
    padding: 0,
    margin: 0,
    paddingBottom: 5,
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
