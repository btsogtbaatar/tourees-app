import { StyleSheet } from 'react-native';
import { colors } from '../../../../constants/colors';
import { verticalScale } from '../../../../utilities/metrics';

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  tabButton: {
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 12,
    flex: 1,
  },
  tabText: {
    textAlign: 'center',
  },
  emailTouch: {
    width: '45%',
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
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
    color: '#21272D',
    fontFamily: 'Nunito',
  },
  selectedBox: {
    borderColor: colors.primaryColor,
    backgroundColor: colors.placeColor,
  },
  unSelectedBox: {
    backgroundColor: 'transparent',
    borderColor: colors.brandGray,
  },
  input: {
    color: colors.textDark,
    paddingHorizontal: 10,
    paddingVertical: 2,
    fontWeight: 'bold',
    marginTop: 20,
    backgroundColor: colors.white,
  },
  inputExtra: {
    height: 48,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 15,
    fontFamily: 'Nunito',
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
    marginTop: verticalScale(12),
    fontFamily: 'Nunito',
  },
  btn: {
    height: 41,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: colors.primaryColor,
    color: colors.textDark,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTextStyle: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'Nunito',
  },
  btnContainer: {
    // backgroundColor: Colors.textWhite,
    width: '100%',
  },
});

export default styles;
