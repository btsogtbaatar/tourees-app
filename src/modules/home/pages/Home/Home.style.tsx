import { StyleSheet } from 'react-native';
import { colors, FontWeight, Typography } from '../../../../theme';

const HomeStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  title: {
    ...Typography.textSmall,
    fontWeight: FontWeight.bold,
    color: colors.gray700,
    marginBottom: 8,
  },
  listContainer: {
    marginBottom: 8,
  },
});

export default HomeStyle;
