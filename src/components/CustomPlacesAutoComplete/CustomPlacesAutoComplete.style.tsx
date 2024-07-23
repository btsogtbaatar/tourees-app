import { StyleSheet } from 'react-native';
import { colors } from '../../constants';

export const CustomPlacesAutoCompleteStyle = StyleSheet.create({
  wrappingContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
  },
  container: {
    maxHeight: 200,
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
