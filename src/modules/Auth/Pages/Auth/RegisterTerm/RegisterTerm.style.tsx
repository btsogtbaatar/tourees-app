import { StyleSheet } from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../../../uitls/metrics';
import { Colors } from '../../../../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(16),
  },
  subContainer: {
    marginTop: verticalScale(16),
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    fontStyle: 'normal',
    color: '#21272D',
    lineHeight: 21,
    marginBottom: verticalScale(10),
    fontFamily: 'Nunito',
  },
  subTitle: {
    marginLeft: horizontalScale(10),
    marginBottom: verticalScale(10),
    fontSize: 12,
    color: '#5F676F',
    fontWeight: '400',
    lineHeight: 20,
    fontFamily: 'Nunito',
  },
  label: {
    marginLeft: 0,
  },
  checkContainer: {
    borderRadius: moderateScale(12),
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(10),
    borderWidth: 1,
  },
  checkText: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 21,
    color: '#21272D',
    fontFamily: 'Nunito',
  },
});

export default styles;
