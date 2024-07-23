import { StyleSheet } from 'react-native';
import { colors } from '../../constants';

export const SuggestionItemStyle = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    marginHorizontal: 15,
  },
  text: {
    fontSize: 12,
    fontFamily: 'Nunito',
  },
  infoText: {
    fontSize: 12,
    fontFamily: 'Nunito',
    color: colors.gray300,
  },
});
