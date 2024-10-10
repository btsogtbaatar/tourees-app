import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { getEnv } from '../../api';
import {
  TaskModel,
  TaskStatus,
} from '../../modules/Request/entities/request.model';
import { CheckIcon } from '../Icon';
import styles from './RequestsCard.style';

interface UserRequestCardProps {
  // TODO: Define props type
  item: TaskModel.TaskResponse;
}

const UserRequestCard = ({ item }: UserRequestCardProps) => {
  const navigation = useNavigation();
  const onDetails = () => {
    navigation.navigate('RequestDetail', {
      id: item.id,
      title: item.subCategory.name,
      status: item.status,
    });
  };

  const timeFormat = () => {
    return moment().format('h:mm');
  };

  return (
    <TouchableOpacity style={styles.userCardContainer} onPress={onDetails}>
      <View style={styles.flexRow}>
        <View style={styles.imageContainer}>
          <Image
            width={33}
            height={33}
            source={{
              uri: `${getEnv().IMAGE_URL}${item.subCategory.image?.url ?? ''}`,
            }}
          />
        </View>
        <View style={styles.mh12}>
          <Text style={styles.titleStyle}>{item.subCategory.name}</Text>
          <Text style={styles.descStyle}>Таны хүсэлт хуваарилагдсан байна</Text>
        </View>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.timeStyle}>{timeFormat()}</Text>
        <View
          style={[
            styles.iconContainer,
            item.status == TaskStatus.COMPLETED && {
              backgroundColor: 'rgba(70, 220, 157, 0.20)',
            },
          ]}>
          {item.status == TaskStatus.COMPLETED ? (
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
