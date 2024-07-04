import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import { getEnv } from '../../api';
import { colors } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import { RootStackParamList } from '../../navigation/types';
import { verticalScale } from '../../utilities/metrics';

const { width } = Dimensions.get('window');

const ITEM_WIDTH = width / 2 - SPACING * 3;

export type CardItem = {
  id: number;
  title: string;
  imageUrl?: string;
};

interface CardProps {
  navigation: NavigationProp<RootStackParamList>;
  color?: string;
  item: CardItem;
}

const DashboardCard = ({ navigation, color, item }: CardProps) => {
  return (
    <TouchableOpacity
      style={{
        borderRadius: 16,
        backgroundColor: colors.textWhite,
        width: ITEM_WIDTH,
        marginTop: verticalScale(16),
        padding: 8,
      }}
      onPress={() => {
        navigation.navigate('RequestStack', {
          screen: 'SubCategoryList',
          params: {
            title: item.title,
            categoryId: item.id,
          },
        });
      }}>
      <View
        style={{
          borderRadius: SPACING,
          backgroundColor: color ?? 'rgba(241, 89, 128, 0.20)',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <Image
          style={{ width: '100%', height: 100, borderRadius: SPACING }}
          source={{
            uri: `${getEnv().IMAGE_URL}${item.imageUrl}` ?? '',
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
