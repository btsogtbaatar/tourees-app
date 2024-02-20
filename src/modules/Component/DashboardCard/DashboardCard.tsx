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
import { CategoryModule } from '../../Auth/entities';

const { width } = Dimensions.get('window');

const ITEM_WIDTH = width / 2 - SPACING * 3;

interface CardProps {
  // title: string;
  navigation: NavigationProp<DashboardStackParamList>;
  image?: any;
  color?: string;
  // id: number;
  item: CategoryModule.Categories;
}

const DashboardCard = ({ navigation, color, item }: CardProps) => {
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
            title: item.title,
            categoryId: item.id,
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
          style={{ width: '100%', height: 100 }}
          source={{
            uri: `http://localhost:8000/storage/${item.image_url}`,
          }}
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
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};

export default DashboardCard;
