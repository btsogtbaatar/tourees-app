import { StyleSheet } from 'react-native';
import { Colors } from '../../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    marginTop: 16,
    height: 52,
    justifyContent: 'center',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  unCheck: {
    backgroundColor: '#FFFFFF',
    borderColor: '#EBECED',
  },
  checkStyle: {
    backgroundColor: Colors.placeColor,
    borderColor: Colors.borderPrimaryColor,
  }
});

export default styles;
