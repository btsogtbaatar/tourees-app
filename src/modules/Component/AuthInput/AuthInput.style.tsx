import { StyleSheet } from 'react-native';
import { Colors } from '../../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.textWhite,
    height: 58,
    maxHeight: 58,
    borderWidth: 1,
    borderRadius: 16,
    gap: 12,
    paddingHorizontal: 12,
    paddingTop: 4,
    marginTop: 16

  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: '#878D93',
  },
  inputStyle: {
    color: '#21272D',
    fontWeight: '600',
    fontSize: 15,
    marginVertical: -5,
  },
});

export default styles;
