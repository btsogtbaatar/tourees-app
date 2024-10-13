import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { TaskModel } from '../../modules/Request/entities/request.model';
import { colors, Typography } from '../../theme';
import { horizontalScale } from '../../utilities';
import CustomGradientButton from '../CustomButton/CustomGradientButton';
import { UserIcon } from '../Icon';
import { OfferStyle } from './Offer.style';

export interface OfferProps {
  taskId: number;
  offer: TaskModel.OfferResponse;
}

export default function Offer(props: OfferProps) {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <View style={OfferStyle.container}>
      <View style={OfferStyle.body}>
        <View style={OfferStyle.left}>
          <UserIcon color={colors.gray700} height={25} width={25} />
          <Text style={OfferStyle.name}>
            {props.offer.contractor?.user.firstName}{' '}
            {props.offer.contractor?.user.lastName}
          </Text>
        </View>
        <Text style={OfferStyle.price}>
          {Intl.NumberFormat().format(props.offer.price ?? 0)}₮
        </Text>
      </View>

      <Text style={OfferStyle.description} numberOfLines={3}>
        {props.offer.description}
      </Text>
      <View style={OfferStyle.bottom}>
        <View style={{ marginRight: horizontalScale(8) }}>
          <CustomGradientButton
            style={{
              text: { ...Typography.textSmall, color: colors.white },
              button: { height: 30 },
            }}
            title={t('offer.chat')}
            onPress={() => {
              navigation.navigate('Chat', {id: props.taskId});
            }}
          />
        </View>
        <CustomGradientButton
          style={{
            text: { ...Typography.textSmall, color: colors.white },
            button: { height: 30 },
          }}
          title={t('offer.approve')}
        />
      </View>
    </View>
  );
}
