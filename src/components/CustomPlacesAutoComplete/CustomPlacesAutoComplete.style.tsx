import { StyleSheet } from 'react-native';
import { colors } from '../../constants';

export const CustomPlacesAutoCompleteStyle = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginTop: 10,
  },
  listContainer: {
    maxHeight: 150,
    backgroundColor: 'white',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  seperator: {
    height: 0.5,
    backgroundColor: colors.borderColor,
    marginHorizontal: 15,
  },
});
