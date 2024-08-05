import { StyleSheet } from 'react-native';
import { Theme } from 'react-native-calendars/src/types';
import { FontWeight, getFontWeight, Typography } from '../../../../theme';
import { colors } from '../../../../theme/colors';
export const calendarTheme: Theme = {
  dayTextColor: colors.textColor,
  textSectionTitleColor: colors.gray700,
  selectedDayTextColor: colors.white,
  selectedDayBackgroundColor: colors.primary500,
  textMonthFontWeight: 'bold',
  monthTextColor: colors.gray700,
  arrowColor: colors.primary500,
};

const UserRequestStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.gray700,
  },
  headerContainer: {
    flexDirection: 'row',
    gap: 20,
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
    color: colors.primary500,
    marginRight: 8,
  },
});

export default UserRequestStyle;
