import { StyleSheet } from 'react-native';
import { horizontalScale } from '../../utilities';
import { colors, getFontWeight, Typography } from '../../theme';

const GroupedMenuItemStyle = StyleSheet.create({
  container: {
    padding: horizontalScale(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: colors.otpBorder,
    borderBottomWidth: 1,
    alignSelf: 'stretch',
  },
  menuName: {
    ...Typography.textRegular,
    ...getFontWeight('500'),
    lineHeight: 18,
    color: colors.textColor,
    marginLeft: horizontalScale(16),
  },
  subMenu: {
    ...Typography.textRegular,
    ...getFontWeight('600'),
    color: colors.gray300,
    lineHeight: 24,
    marginRight: horizontalScale(12),
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menu: {
    flexDirection: 'row',
    flex: 1,
  },
});
export default GroupedMenuItemStyle;
