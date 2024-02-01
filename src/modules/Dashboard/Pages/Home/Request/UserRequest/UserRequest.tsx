import moment from 'moment';
import React, { useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { DateData, LocaleConfig } from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../../../../../../constants/Colors';
import { calendarMnLocale } from '../../../../../../constants/DummyData';
import {
  horizontalScale,
  verticalScale,
} from '../../../../../../uitls/metrics';
import Calendar from '../../../../../Component/Calendar/Calendar';
import ImageUploadButton from '../../../../../Component/ImageUploadButton/ImageUploadButton';

const UserRequest = () => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      locations={[0, 1]}
      colors={['#37414B', '#161A1E']}
      style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            paddingHorizontal: horizontalScale(16),
            paddingBottom: verticalScale(16),
            flexDirection: 'row',
          }}>
          <View
            style={{
              paddingRight: 16,
              alignItems: 'flex-start',
              width: '70%',
            }}>
            <Text
              style={{
                color: Colors.textWhite,
                fontSize: 20,
                fontWeight: '800',
                lineHeight: 30,
              }}>
              Хот дотор нүүлгэлт
            </Text>
            <Text
              style={{
                color: Colors.textWhite,
                fontSize: 12,
                fontWeight: '400',
                lineHeight: 18,
              }}>
              Lorem ipsum dolor sit ametconsectetur. Diam quis molestie
              facilisis aliquet tristique
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              backgroundColor: 'red',
            }}>
            <Image
              style={{ flex: 1, width: '100%' }}
              source={require('../../../../../../assets/svg/dashboard/Frame.png')}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.textWhite,
            borderTopEndRadius: 16,
            borderTopStartRadius: 16,
          }}>
          <View
            style={{
              height: verticalScale(45),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: Colors.textHeader,
                fontSize: 18,
                fontWeight: '700',
                lineHeight: 27,
              }}>
              Хүсэлт үүсгэх
            </Text>
          </View>
          <ScrollView
            style={{ flex: 1, paddingHorizontal: horizontalScale(16) }}>
            <Text style={{ fontWeight: '500', lineHeight: 21 }}>
              Хүргэлт хийх өдөр сонгох
            </Text>
            <Calendar
              onSuccess={function (startDate: string): void {
                throw new Error('Function not implemented.');
              }}
              initialStartDate={moment().format('YYYY-MM-DD')}
            />
            <Text style={{ fontWeight: '500', lineHeight: 21 }}>
              Зураг оруулах
            </Text>
            <ImageUploadButton />
          </ScrollView>
        </View>
      </View>
    </LinearGradient>
  );
};

export default UserRequest;
