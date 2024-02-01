import React from 'react';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import RightIcon from '../../../assets/svg/icons/RightIcon';
import { horizontalScale, verticalScale } from '../../../uitls/metrics';
import { Colors } from '../../../../constants/Colors';
import { CategoryModule } from '../../Auth/entities';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { DashboardStackParamList } from '../../../types/DashboardStackParamList';

interface PropsCard {
  item: CategoryModule.Category;
  index: number;
}

const RequestsCard = (props: PropsCard) => {
  const { index, item } = props;
  const navigation = useNavigation<DashboardStackParamList>();
  console.log(navigation, 'nac');

  const onPress = () => {
    navigation.navigate('UserRequest', {});
  };

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: horizontalScale(6),
        paddingHorizontal: horizontalScale(12),
        height: verticalScale(64),
        flexShrink: 0,
        borderRadius: horizontalScale(16),
        backgroundColor: Colors.textWhite,
        marginTop: index > 0 ? verticalScale(16) : 0,
      }}
      onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View
          style={{
            width: horizontalScale(52),
            borderRadius: horizontalScale(10),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: 52,
              height: 52,
              borderRadius: 10,
            }}
            source={require('../../../assets/svg/dashboard/Frame.png')}
          />
        </View>
        <View style={{ marginHorizontal: horizontalScale(12) }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              lineHeight: 24,
              color: Colors.textHeader,
            }}>
            {item.text}
          </Text>
          <Text
            style={{
              color: Colors.primaryColor,
              fontSize: 12,
              fontWeight: '500',
              lineHeight: 18,
            }}>
            {item.value}
          </Text>
        </View>
      </View>
      <View>
        <RightIcon />
      </View>
    </TouchableOpacity>
  );
};

export default RequestsCard;
