import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './RequestsCard.style';
import { useNavigation } from '@react-navigation/native';
import { DashboardStackParamList } from '../../../types/DashboardStackParamList';
import { getEnv } from '../../../api';
import { RequestModule } from '../../../context/entities/request.model';
import CheckIcon from '../../../assets/svg/auth/CheckIcon';

interface UserRequestCardProps {
  item: RequestModule.Request;
}

const UserRequestCard = ({ item }: UserRequestCardProps) => {
  const navigation = useNavigation<DashboardStackParamList>();
  const onDetails = () => {
    console.log(item.custom_status.code, 'dsds');

    navigation.navigate('RequestStack', {
      screen: 'RequestDetail',
      params: {
        title: item.name,
        url: item.sub_category.image_url,
        statusType: item.custom_status,
      },
    });
  };

  return (
    <TouchableOpacity style={styles.userCardContainer} onPress={onDetails}>
      <View style={styles.flexRow}>
        <View style={styles.imageContainer}>
          <Image
            width={33}
            height={18}
            source={{
              uri: `${getEnv().IMAGE_URL}${item.sub_category.image_url}`,
            }}
          />
        </View>
        <View style={styles.mh12}>
          <Text style={styles.titleStyle}>{item.name}</Text>
          <Text style={styles.descStyle}>Таны хүсэлт хуваарилагдсан байна</Text>
        </View>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.timeStyle}>21: 15</Text>
        <View
          style={[
            styles.iconContainer,
            item.custom_status.code == '3' && {
              backgroundColor: 'rgba(70, 220, 157, 0.20)',
            },
          ]}>
          {item.custom_status.code == '3' ? (
            <CheckIcon width={10} height={10} color={'#46DC9D'} />
          ) : (
            <Text style={styles.iconText}>1</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserRequestCard;
