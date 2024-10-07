import { StyleSheet } from 'react-native';
import { colors } from '../../theme';
import { horizontalScale, verticalScale } from '../../utilities';

const CalendarStyle = StyleSheet.create({
  container: {
    display: 'flex',
    gap: verticalScale(16),
    borderRadius: 16,
    borderWidth: 1,
    padding: horizontalScale(16),
    borderColor: colors.borderColor,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 16,
    borderWidth: 1,
  },
  inActive: {
    borderColor: colors.borderColor,
  },
  active: {
    borderColor: colors.borderPrimaryColor,
    backgroundColor: colors.placeColor,
  },
  dateSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: horizontalScale(8),
  },
  dateButtons: {
    paddingLeft: horizontalScale(16),
    paddingRight: horizontalScale(16),
    paddingTop: verticalScale(8),
    paddingBottom: verticalScale(8),
  },
  infoSection: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 16,
    backgroundColor: colors.placeColor,
    justifyContent: 'center',
    alignItems: 'center',   
    padding: verticalScale(10),
    gap: horizontalScale(16),
  },
  timeSection: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    paddingTop: verticalScale(8),
    gap: horizontalScale(16),
  },
  timeSectionRow: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    gap: horizontalScale(16),
  },
  timeButton: {
    flex: 1,
    padding: verticalScale(10),
    gap: horizontalScale(4),
  },
});

export default CalendarStyle;
