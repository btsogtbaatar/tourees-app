import { StyleSheet } from 'react-native';
import { horizontalScale, verticalScale } from '../../../../utilities';
import { Typography, getFontWeight, FontWeight } from '../../../../theme';

export const RegisterProfileStyle = StyleSheet.create({
  formItem: {
    marginTop: verticalScale(20),
  },
  label: {
    ...Typography.textSmall,
    ...getFontWeight(FontWeight.bold),
    marginBottom: 8,
  },
  workingContainer: {
    marginTop: verticalScale(8),
    flexDirection: 'row',
    width: '100%',
    gap: horizontalScale(16),
    alignItems: 'center',
  },
  alignCenter: {
    alignSelf: 'center',
  },
});
