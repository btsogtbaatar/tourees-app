import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../../constants/Colors';
import RightIcon from '../../../assets/svg/icons/RightIcon';
import { DashboardStackParamList } from '../../../types/DashboardStackParamList';
import { horizontalScale, verticalScale } from '../../../uitls/metrics';
import { CategoryModule } from '../../Auth/entities';
import styles from './RequestsCard.style';
import { getEnv } from '../../../api';

interface PropsCard {
  item: CategoryModule.Categories;
  index: number;
}

const RequestsCard = (props: PropsCard) => {
  const { index, item } = props;
  const navigation = useNavigation<DashboardStackParamList>();

  const onPress = () => {
    navigation.navigate('UserRequest', { item });
  };

  return (
    <TouchableOpacity style={styles.userCardContainer} onPress={onPress}>
      <View style={styles.flexRow}>
        <View style={styles.requestImgContainer}>
          <Image
            style={styles.br10}
            width={52}
            height={52}
            source={{
              uri: `${getEnv().IMAGE_URL}${item.image_url}`,
            }}
          />
        </View>
        <View style={{ marginHorizontal: horizontalScale(12) }}>
          <Text style={styles.titleStyle}>{item.title}</Text>
          <Text style={styles.descStyle}>{item.description}</Text>
        </View>
      </View>
      <View>
        <RightIcon />
      </View>
    </TouchableOpacity>
  );
};

export default RequestsCard;
