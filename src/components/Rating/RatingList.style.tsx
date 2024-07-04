import { StyleSheet } from 'react-native';
import { horizontalScale } from '../../utilities/metrics';
import { colors } from '../../constants/colors';

const styles = StyleSheet.create({
  ratingH: {
    marginHorizontal: horizontalScale(1),
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  ratingText: {
    color: colors.gray300,
    marginLeft: horizontalScale(8),
    fontWeight: '700',
    lineHeight: 15,
    fontSize: 11,
    fontFamily: 'Nunito',
  },
});

export default styles;
