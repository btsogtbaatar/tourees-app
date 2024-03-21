import { StyleSheet } from 'react-native';
import { Colors } from '../../../../constants/Colors';
import { horizontalScale } from '../../../uitls/metrics';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.textWhite,
    height: horizontalScale(58),
    maxHeight: horizontalScale(58),
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingTop: 2,
    marginTop: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: '#878D93',
    marginLeft: horizontalScale(5),
    fontFamily: 'Nunito',
  },
  inputStyle: {
    color: '#21272D',
    fontWeight: '600',
    fontSize: 15,
    flex: 1,
    fontFamily: 'Nunito',
  },
});

export default styles;
