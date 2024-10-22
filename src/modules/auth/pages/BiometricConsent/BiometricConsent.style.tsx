import { StyleSheet } from 'react-native';
import { FontWeight, getFontWeight, Typography } from '../../../../theme';

export const BiometricConsentStyle = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  innerContainer: {
    flex: 1,
    marginTop: 100,
    width: '100%',
    alignItems: 'center',
  },
  label: {
    ...Typography.textRegular,
    ...getFontWeight(FontWeight.bold),
    paddingHorizontal: 16,
    marginTop: 20,
    textAlign: 'center',
  },
  messageContainer: {
    marginBottom: 16,
  },
  message: {
    ...Typography.textSmall,
  },
  flexOne: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    gap: 8,
  },
});
