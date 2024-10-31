import { StyleSheet } from 'react-native';
import {
  colors,
  FontWeight,
  getFontWeight,
  Typography,
} from '../../../../theme';
import { horizontalScale, verticalScale } from '../../../../utilities/metrics';

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
    marginRight: -16,
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
  bannerContainer: {
    flexDirection: 'row',
    gap: horizontalScale(8),
    marginBottom: verticalScale(8),
  },
  bannerItem: {
    flex: 1,
  },
});

export default HomeStyle;
