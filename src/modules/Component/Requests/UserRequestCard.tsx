import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './RequestsCard.style';

interface UserRequestCardProps {
  item: any;
}

const UserRequestCard = ({ item }: UserRequestCardProps) => {
  return (
    <TouchableOpacity style={styles.userCardContainer}>
      <View style={styles.flexRow}>
        <View style={styles.imageContainer}>
          <Image
            width={33}
            height={18}
            source={require('../../../assets/svg/dashboard/pngwing5.png')}
          />
        </View>
        <View style={styles.mh12}>
          <Text style={styles.titleStyle}>{item.name}</Text>
          <Text style={styles.descStyle}>Таны хүсэлт хуваарилагдсан байна</Text>
        </View>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.timeStyle}>21: 15</Text>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>1</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserRequestCard;
