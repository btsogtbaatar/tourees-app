import { StyleSheet } from 'react-native';
import { horizontalScale, verticalScale } from '../../../../utilities';

const TaskerRegisterStyle = StyleSheet.create({
  container: { gap: verticalScale(10), display: 'flex', flex: 1 },
  type: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    gap: horizontalScale(16),
  },
  typeButtons: {
    flex: 1,
    padding: verticalScale(10),
    gap: horizontalScale(4),
  },
});

export default TaskerRegisterStyle;
