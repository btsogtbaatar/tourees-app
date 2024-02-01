import { StyleSheet } from 'react-native';
import { Colors } from '../../../../../../constants/Colors';
import { verticalScale } from '../../../../../uitls/metrics';

const styles = StyleSheet.create({
  emailTouch: {
    width: '45%',
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  subContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textCenter: {
    textAlign: 'center',
  },
  textStyle: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    color: '#21272D'
  },
  selectedBox: {
    borderColor: Colors.primaryColor,
    backgroundColor: Colors.placeColor,
  },
  unSelectedBox: {
    backgroundColor: 'transparent',
    borderColor: Colors.brandGray,
  },
  input: {
    color: Colors.textDark,
    paddingHorizontal: 10,
    paddingVertical: 2,
    fontWeight: 'bold',
    marginTop: 20,
    backgroundColor: Colors.textWhite,
  },
  inputExtra: {
    height: 48,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 15,
  },
  mt10: {
    marginTop: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  otherLabel: {
    color: '#5F676F',
    fontSize: 12,
    fontWeight: '500',
    marginTop: verticalScale(12)
  },
  btn: {
    height: 41,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: Colors.primaryColor,
    color: Colors.textDark,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTextStyle: {
    color: Colors.textWhite,
    fontSize: 13,
    fontWeight: '700',
  },
  btnContainer: {
    // backgroundColor: Colors.textWhite,
    width: '100%',
  },
});

export default styles;
