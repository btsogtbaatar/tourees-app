import { StyleSheet } from 'react-native';
import { Theme } from 'react-native-calendars/src/types';
import { FontWeight, getFontWeight, Typography } from '../../../../theme';
import { colors } from '../../../../theme/colors';
import { verticalScale } from '../../../../utilities';
export const calendarTheme: Theme = {
  dayTextColor: colors.textColor,
  textSectionTitleColor: colors.gray700,
  selectedDayTextColor: colors.white,
  selectedDayBackgroundColor: colors.primaryGradient,
  textMonthFontWeight: 'bold',
  monthTextColor: colors.gray700,
  arrowColor: colors.primaryGradient,
};

const UserRequestStyle = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.gray700,
  },
  headerContainer: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 24,
  },
  label: {
    ...Typography.textSmall,
    ...getFontWeight(FontWeight.bold),
    marginBottom: 8,
  },
  formItem: {
    marginBottom: 24,
  },
  labelContainer: {
    flex: 2,
  },
  title: {
    ...Typography.textLarge,
    ...getFontWeight(FontWeight.extraBold),
    color: colors.white,
  },
  subtitle: {
    ...Typography.textSmaller,
    color: 'white',
  },
  image: {
    flex: 1,
    borderRadius: 16,
  },
  bodyContainer: {
    flex: 5,
    backgroundColor: colors.white,
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
  },
  icon: {
    color: colors.primaryGradient,
    marginRight: 8,
  },
  button: {
    marginTop: verticalScale(12),
  }
});

export default UserRequestStyle;
