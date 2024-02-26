import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CircleIcon } from '../../../assets/svg';
import { horizontalScale, verticalScale } from '../../../uitls/metrics';
import HeaderBack from './HeaderBack';
import { Colors } from '../../../../constants/Colors';

interface HeaderRequestProps {
  title?: string;
}

const HeaderRequest = ({ title }: HeaderRequestProps) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingVertical: verticalScale(8),
        paddingHorizontal: horizontalScale(4),
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: insets.top,
        gap: 12,
        flexDirection: 'row',
      }}>
      <HeaderBack />
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: 'rgba(241, 89, 128, 0.2)',
              borderRadius: 22,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              width={26.2}
              height={22}
              source={require('../../../assets/svg/dashboard/pngwing5.png')}
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                lineHeight: 24,
                color: Colors.textHeader,
              }}>
              {title ? title : ''}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '600',
                color: Colors.gray300,
              }}>
              {title ? title : ''}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            paddingRight: horizontalScale(10),
            borderRadius: 12,
            alignSelf: 'center',
          }}>
          <CircleIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderRequest;
