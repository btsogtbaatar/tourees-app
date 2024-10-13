import { StyleSheet } from 'react-native';
import { FontWeight, Typography, getFontWeight } from '../../../../theme';
import { horizontalScale, verticalScale } from '../../../../utilities';

export const RegisterProfileStyle = StyleSheet.create({
  container: {
    marginBottom: verticalScale(16),
  },
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
