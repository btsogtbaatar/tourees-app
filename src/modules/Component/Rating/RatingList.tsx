import React from 'react';
import { FlatList, Text, View } from 'react-native';
import LogoMini from '../../../assets/svg/logo/LogoMini';
import { Colors } from '../../../../constants/Colors';
import LogoMiniBorder from '../../../assets/svg/logo/LogoMiniBorder';
import { horizontalScale } from '../../../uitls/metrics';
import styles from './RatingList.style';

interface RatingListProps {
  rating: number;
}

const numbers = [1, 2, 3, 4, 5];

const RatingList = ({ rating }: RatingListProps) => {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal={true}
        data={numbers}
        renderItem={({ item }) =>
          item <= Math.round(rating) ? (
            <LogoMini color={Colors.primaryColor} width={16} height={16} />
          ) : (
            <LogoMiniBorder width={16} height={16} />
          )
        }
        ItemSeparatorComponent={() => <View style={styles.ratingH} />}
        ListFooterComponent={() => (
          <Text style={styles.ratingText}>
            {rating} <Text>({(100 / Math.round(rating)).toFixed(0)})</Text>
          </Text>
        )}
      />
    </View>
  );
};

export default RatingList;
