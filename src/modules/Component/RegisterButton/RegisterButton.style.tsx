import { StyleSheet } from 'react-native';
import { Colors } from '../../../../constants/Colors';

const styles = StyleSheet.create({
  emailTouch: {
    width: '45%',
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  textStyle: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    color: '#21272D',
  },
  selectedBox: {
    borderColor: Colors.primaryColor,
    backgroundColor: Colors.placeColor,
  },
  unSelectedBox: {
    backgroundColor: 'transparent',
    borderColor: Colors.brandGray,
  },
});

export default styles;
