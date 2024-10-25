import { StyleSheet } from 'react-native';
import {
  colors,
  FontWeight,
  getFontWeight,
  Typography,
} from '../../../../theme';
import { verticalScale } from '../../../../utilities/metrics';

const HomeStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  title: {
    ...Typography.textSmall,
    ...getFontWeight(FontWeight.bold),
    color: colors.gray700,
    marginBottom: 8,
  },
  listContainer: {
    marginBottom: 8,
    marginRight: -16
  },
  inputContainer: {
    marginBottom: 8,
  },
  divider: {
    width: 16,
  },
  serviceSearchContainer: {
    marginBottom: 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  listContentContainer: {
    paddingBottom: verticalScale(150),
  },
});

export default HomeStyle;
