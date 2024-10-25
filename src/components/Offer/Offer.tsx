import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectUser } from '../../modules/Auth/slice/authSlice';
import { TaskModel, TaskStatus } from '../../modules/Request/entities/request.model';
import { approveOffer } from '../../modules/Request/service/request.service';
import { colors, Typography } from '../../theme';
import { horizontalScale } from '../../utilities';
import CustomGradientButton from '../CustomButton/CustomGradientButton';
import CustomImage from '../CustomImage/CustomImage';
import { notifyMessage } from '../CustomToast/CustomToast';
import { OfferStyle } from './Offer.style';

export interface OfferProps {
  task: TaskModel.TaskResponse;
  offer: TaskModel.OfferResponse;
  onApprove?: () => void;
}

export default function Offer(props: OfferProps) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const user = useSelector(selectUser);

  return (
    <View style={OfferStyle.container}>
      <View style={OfferStyle.body}>
        <View style={OfferStyle.left}>
          <CustomImage
            style={OfferStyle.image}
            source={
              props.offer.contractor.user.profilePicture
                ? {
                    uri: props.offer.contractor.user.profilePicture.url,
                  }
                : require('../../../assets/images/icon-placeholder.png')
            }
          />
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
        {props.task.customer.user.id === user?.id && (
          <View style={{ marginRight: horizontalScale(8) }}>
            <CustomGradientButton
              style={{
                text: { ...Typography.textSmall, color: colors.white },
                button: OfferStyle.smallButton,
              }}
              title={t('offer.chat')}
              onPress={() => {
                navigation.navigate('Chat', { id: props.offer.conversation.id });
              }}
            />
          </View>
        )}
        {props.offer.contractor?.user.id === user?.id && props.task.status !== TaskStatus.ASSIGNED && (
          <View style={{ marginRight: horizontalScale(8) }}>
            <CustomGradientButton
              style={{
                text: { ...Typography.textSmall, color: colors.white },
                button: OfferStyle.smallButton,
              }}
              title={t('offer.edit')}
              onPress={() => {
                navigation.navigate('EditOffer', { id: props.offer.id });
              }}
            />
          </View>
        )}
        {props.task.customer.user.id === user?.id && props.task.status !== TaskStatus.ASSIGNED && (
          <CustomGradientButton
            style={{
              text: { ...Typography.textSmall, color: colors.white },
              button: OfferStyle.smallButton,
            }}
            title={t('offer.approve')}
            onPress={() => {
              approveOffer(props.offer.id).then(() => {
                notifyMessage(t('successful'), t('offer.successOffer'));
                props.onApprove && props.onApprove(); 
              });
            }}
          />
        )}
      </View>
    </View>
  );
}
