import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

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
    backgroundColor: colors.placeColor,
    borderColor: colors.borderPrimaryColor,
  },
});

export default styles;
