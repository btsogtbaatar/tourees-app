import { StyleSheet } from 'react-native';
import { colors } from '../../../../theme';
import { horizontalScale, verticalScale } from '../../../../utilities';

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
    backgroundColor: colors.white,
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
    color: colors.gray700,
  },
  descStyle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary500,
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
    backgroundColor: colors.primary500,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 8,
  },
  iconText: {
    textAlign: 'center',
    color: colors.white,
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
  messageContainer: {
    padding: verticalScale(12),
    backgroundColor: colors.placeColor,
    borderRadius: 16,
  },
  messageHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  messageLogo: {
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 28,
  },
  messageTimeStyle: {
    color: colors.gray300,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 18,
  },
  messageStyle: {
    marginVertical: verticalScale(12),
    color: colors.gray600,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    alignSelf: 'stretch',
  },
  logoContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  logoText: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '700',
  },
  operatorBtn: {
    paddingLeft: horizontalScale(8),
    paddingRight: horizontalScale(12),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary500,
    gap: 4,
    alignItems: 'center',
    flexDirection: 'row',
    height: verticalScale(32),
    alignSelf: 'flex-start',
  },
  operatorTxt: {
    marginLeft: horizontalScale(4),
    color: colors.primary500,
  },
  operatorContainer: {
    padding: verticalScale(12),
    backgroundColor: colors.white,
    borderRadius: 12,
    gap: 12,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profile: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21,
    marginLeft: horizontalScale(12),
  },
  alignCenter: {
    alignItems: 'center',
  },
});

export default styles;
