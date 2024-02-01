import React from 'react';
import { SPACING } from '../../../../constants/SPACING';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';
import { Colors } from '../../../../constants/Colors';
import { verticalScale } from '../../../uitls/metrics';
import { NavigationProp } from '@react-navigation/native';
import { DashboardStackParamList } from '../../../types/DashboardStackParamList';

const { width } = Dimensions.get('window');

const ITEM_WIDTH = width / 2 - SPACING * 3;

interface CardProps {
  title: string;
  navigation: NavigationProp<DashboardStackParamList>;
  image?: any;
  color?: string;
  imageUrl?: ImageSourcePropType;
  id: number;
}

const DashboardCard = ({
  title,
  navigation,
  image,
  color,
  imageUrl,
  id,
}: CardProps) => {
  return (
    <TouchableOpacity
      style={{
        borderRadius: 16,
        backgroundColor: Colors.textWhite,
        width: ITEM_WIDTH,
        marginTop: verticalScale(16),
        padding: 8,
      }}
      onPress={() => {
        navigation.navigate('RequestStack', {
          screen: 'RequestList',
          params: {
            title: title,
            requestId: id,
          },
        });
      }}>
      <View
        style={{
          borderRadius: SPACING,
          backgroundColor: color ? color : 'rgba(241, 89, 128, 0.20)',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <Image
          alt="image"
          source={
            imageUrl
              ? imageUrl
              : require('../../../assets/svg/dashboard/pngwing2.png')
          }
        />
      </View>
      <Text
        style={{
          marginTop: verticalScale(8),
          fontSize: 16,
          fontWeight: '600',
          fontStyle: 'normal',
          fontFamily: 'Nunito',
          color: '#21272D',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default DashboardCard;
