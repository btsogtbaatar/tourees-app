import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { getEnv } from '../../api';
import RightIcon from '../../assets/svg/icons/RightIcon';
import { RequestStackParamList } from '../../modules/request/navigation/types';
import { SharedModel } from '../../modules/shared/entities/shared.model';
import { horizontalScale } from '../../utilities';
import styles from './RequestsCard.style';

interface PropsCard {
  item: SharedModel.Category;
  index: number;
}

const RequestsCard = (props: PropsCard) => {
  const { item } = props;
  const navigation = useNavigation<RequestStackParamList>();

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
              uri: `${getEnv().IMAGE_URL}${item.image?.url ?? ''}`,
            }}
          />
        </View>
        <View style={{ marginHorizontal: horizontalScale(12) }}>
          <Text style={styles.titleStyle}>{item.name}</Text>
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
