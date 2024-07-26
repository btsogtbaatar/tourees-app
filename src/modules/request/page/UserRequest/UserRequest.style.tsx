import { StyleSheet } from 'react-native';
import { Theme } from 'react-native-calendars/src/types';
import { colors } from '../../../../constants/colors';

export const calendarTheme: Theme = {
  dayTextColor: colors.textColor,
  textSectionTitleColor: colors.gray700,
  selectedDayTextColor: colors.white,
  selectedDayBackgroundColor: colors.primaryColor,
  textMonthFontWeight: 'bold',
  monthTextColor: colors.gray700,
  arrowColor: colors.primaryColor,
};

const UserRequestStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    color: colors.primaryColor,
    marginRight: 8,
  },
});

export default UserRequestStyle;
