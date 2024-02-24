import { StyleSheet } from 'react-native';
import { horizontalScale, verticalScale } from '../../../uitls/metrics';
import { Colors } from '../../../../constants/Colors';

const styles = StyleSheet.create({
  userCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: horizontalScale(6),
    paddingHorizontal: horizontalScale(12),
    height: verticalScale(64),
    flexShrink: 0,
    borderRadius: horizontalScale(16),
    backgroundColor: Colors.textWhite,
  },
  flexRow: {
    flexDirection: 'row',
  },
  imageContainer: {
    borderRadius: horizontalScale(22),
    backgroundColor: 'rgba(70, 220, 157, 0.20)',
    width: horizontalScale(44),
    height: verticalScale(44),
    justifyContent: 'center',
    alignItems: 'center',
  },
  mh12: {
    marginHorizontal: horizontalScale(12),
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    color: Colors.textHeader,
  },
  descStyle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primaryColor,
    lineHeight: 18,
  },
  timeContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  timeStyle: {
    color: '#AFB3B7',
    fontSize: 12,
    fontWeight: '600',
  },
  iconContainer: {
    width: 16,
    height: 16,
    backgroundColor: Colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 8,
  },
  iconText: {
    textAlign: 'center',
    color: Colors.textWhite,
    fontWeight: '700',
    lineHeight: 15,
    fontSize: 10,
  },
  requestImgContainer: {
    width: horizontalScale(52),
    borderRadius: horizontalScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  br10: {
    borderRadius: 10,
  },
});

export default styles;
