import { StyleSheet } from 'react-native';
import {
  FontWeight,
  getFontWeight,
  Typography
} from '../../../../theme';

export const CreateOfferStyle = StyleSheet.create({
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  instruction: {
    ...Typography.textSmall,
    textAlign: 'center',
  },
  label: {
    ...Typography.textSmall,
    ...getFontWeight(FontWeight.bold),
    marginBottom: 8,
  },
});
