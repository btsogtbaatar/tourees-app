import { StyleSheet } from 'react-native';
import { Colors } from '../../../../constants/Colors';

export const CustomInputStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.textWhite,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    height: 52,
    flexDirection: 'column',
    justifyContent: 'center'
  },
});
