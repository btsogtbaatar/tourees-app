import { StyleSheet } from 'react-native';
import { horizontalScale, moderateScale, verticalScale } from '../../utilities';
import { colors } from '../../theme';

export const RemarkListViewStyle = StyleSheet.create({
  modalView: {
    flexDirection: 'column',
    paddingBottom: verticalScale(32),
    backgroundColor: colors.white,
    borderRadius: moderateScale(12),
    paddingHorizontal: verticalScale(16),
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  swipeStyle: {
    width: horizontalScale(40),
    height: verticalScale(5),
    backgroundColor: colors.gray300,
    borderRadius: moderateScale(30),
    marginVertical: verticalScale(12),
  },
  container: {
    paddingHorizontal: undefined,
    marginTop: verticalScale(16),
  },
});
