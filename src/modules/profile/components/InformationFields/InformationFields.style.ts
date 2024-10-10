import { StyleSheet } from 'react-native';
import { horizontalScale, verticalScale } from '../../../../utilities';

export const InformationFieldsStyle = StyleSheet.create({
  name: {
    gap: 20,
  },
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
