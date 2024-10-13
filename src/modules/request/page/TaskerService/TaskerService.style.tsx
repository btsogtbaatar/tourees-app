import { StyleSheet } from 'react-native';
import { Theme } from 'react-native-calendars/src/types';
import { FontWeight, getFontWeight, Typography } from '../../../../theme';
import { colors } from '../../../../theme/colors';
import { horizontalScale, verticalScale } from '../../../../utilities';
export const calendarTheme: Theme = {
  dayTextColor: colors.textColor,
  textSectionTitleColor: colors.gray700,
  selectedDayTextColor: colors.white,
  selectedDayBackgroundColor: colors.primaryGradient,
  textMonthFontWeight: 'bold',
  monthTextColor: colors.gray700,
  arrowColor: colors.primaryGradient,
};

export const TaskerServiceStyle = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: verticalScale(16)
  },
  bottomSheetContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
  },
  contentContainer: {
    padding: 10,
    flexGrow: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },

  categoryItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: colors.brandGray,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  categoryItemText: {
    fontSize: 14,
    color: colors.dark700,
  },

  categoryItemSelected: {
    backgroundColor: colors.primary100,
  },
  categoryClickableText: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 16,
    backgroundColor: colors.placeColor,
    justifyContent: 'center',
    padding: verticalScale(10),
    gap: horizontalScale(16),
  },

  locationTypeButton: {
    flex: 1,
    padding: verticalScale(10),
    gap: horizontalScale(8),
    marginHorizontal: horizontalScale(2),
  },
  locationSection: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    paddingTop: verticalScale(10),
    gap: horizontalScale(2),
  },
  locationRow: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: horizontalScale(16),
  },
  inActive: {
    borderColor: colors.borderColor,
    backgroundColor: colors.gray100,
  },
  active: {
    borderColor: colors.borderPrimaryColor,
    backgroundColor: colors.placeColor,
  },
  locationContainer: {
    display: 'flex',
    gap: verticalScale(16),
    borderRadius: 16,
    borderWidth: 1,
    padding: horizontalScale(16),
    borderColor: colors.borderColor,
    marginTop: verticalScale(10),
  },
  touchable: {
    marginTop: verticalScale(10),
    backgroundColor: colors.placeColor,
    padding: 10,
    borderRadius:16
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    ...Typography.textSmall,
    ...getFontWeight(FontWeight.bold),
    marginBottom: 8,
  },
  lockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.disabled,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
