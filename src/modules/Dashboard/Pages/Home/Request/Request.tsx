import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Logo from '../../../../../assets/svg/dashboard/Logo';
import LottieView from 'lottie-react-native';
import LoadingPage from '../../../../Component/Loading/LoadingPage';
import { horizontalScale, verticalScale } from '../../../../../uitls/metrics';
import { Colors } from '../../../../../../constants/Colors';
import { SmallIcon } from '../../../../../assets/svg';

const Request = () => {
  return (
    <SafeAreaView>
      <ScrollView
        style={{
          paddingHorizontal: horizontalScale(16),
          paddingTop: verticalScale(12),
        }}>
        <View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingLeft: horizontalScale(6),
              paddingHorizontal: horizontalScale(12),
              height: verticalScale(64),
              flexShrink: 0,
              borderRadius: horizontalScale(16),
              backgroundColor: Colors.textWhite,
            }}>
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  borderRadius: horizontalScale(22),
                  backgroundColor: 'rgba(70, 220, 157, 0.20)',
                  width: horizontalScale(44),
                  height: verticalScale(44),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{ width: 33, height: 18 }}
                  source={require('../../../../../assets/svg/dashboard/pngwing5.png')}
                />
              </View>
              <View style={{ marginHorizontal: horizontalScale(12) }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    lineHeight: 24,
                    color: Colors.textHeader,
                  }}>
                  Усны хоолой солиулах
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '700',
                    color: Colors.primaryColor,
                    lineHeight: 18,
                  }}>
                  Таны хүсэлт хуваарилагдсан байна
                </Text>
              </View>
            </View>
            <View
              style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              <Text
                style={{ color: '#AFB3B7', fontSize: 12, fontWeight: '600' }}>
                21: 15
              </Text>
              <View>
                <SmallIcon />
                <Text
                  style={{
                    position: 'absolute',
                    left: 5,
                    top: 0.5,
                    textAlign: 'center',
                    color: Colors.textWhite,
                    fontWeight: '700',
                    lineHeight: 15,
                  }}>
                  1
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Request;
