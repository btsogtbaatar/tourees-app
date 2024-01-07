import {StyleSheet} from 'react-native';
import {Colors} from '../../../../constants/Colors';

const styles = StyleSheet.create({
  emailTouch: {
    width: '45%',
    borderRadius: 15,
    borderWidth: 1,
    padding: 12,
  },
  subContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textCenter: {
    textAlign: 'center',
  },
  selectedBox: {
    borderColor: Colors.primaryColor,
    backgroundColor: Colors.placeColor
  },
  unSelectedBox: {
    borderColor: Colors.brandGray,
  },
  input: {
    color: Colors.textDark,
    paddingHorizontal: 10,
    paddingVertical: 2,
    fontWeight: 'bold',
    marginTop: 20,
    backgroundColor: Colors.textWhite
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
    color: Colors.brandGray200,
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
    backgroundColor: Colors.textWhite,
    width: '100%'
  }
});

export default styles;
