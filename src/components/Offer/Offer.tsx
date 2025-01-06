import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectUser } from '../../modules/Auth/slice/authSlice';
import {
  TaskModel,
  TaskStatus,
} from '../../modules/Request/entities/request.model';
import { approveOffer } from '../../modules/Request/service/request.service';
import { getConversationId } from '../../modules/Shared/services/shared.service';
import { colors, Typography } from '../../theme';
import { toastSuccess } from '../../utilities/toast';
import CustomGradientButton from '../CustomButton/CustomGradientButton';
import CustomImage from '../CustomImage/CustomImage';
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
  console.log(props.offer);
  const onNavigate = () => {
    getConversationId(
      props.task.customer.user.id === user?.id
        ? props.offer.contractor.user.id!
        : props.task.customer.user.id!,
    ).then(conversation => {
      console.log('conversation', conversation);
      navigation.navigate('Chat', {
        id: conversation.id,
      });
    });
  };
  return (
    <View style={OfferStyle.container}>
      <View style={OfferStyle.body}>
        <View style={OfferStyle.left}>
          <CustomImage
            style={OfferStyle.image}
            source={
              props.offer?.contractor?.user?.profilePicture
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
      <Text style={OfferStyle.description} numberOfLines={2}>
        {props.offer.description}
      </Text>
      <View style={OfferStyle.bottom}>
        {(props.task.customer.user.id === user?.id ||
          props.offer.contractor.user.id === user?.id) && (
          <CustomGradientButton
            style={{
              text: { ...Typography.textSmall, color: colors.white },
              button: OfferStyle.smallButton,
            }}
            title={t('offer.chat')}
            onPress={onNavigate}
          />
        )}
        {props.offer.contractor?.user.id === user?.id &&
          props.task.status !== TaskStatus.ASSIGNED && (
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
          )}
        {props.task.customer.user.id === user?.id &&
          props.task.status !== TaskStatus.ASSIGNED && (
            <CustomGradientButton
              style={{
                text: { ...Typography.textSmall, color: colors.white },
                button: OfferStyle.smallButton,
              }}
              title={t('offer.approve')}
              onPress={() => {
                approveOffer(props.offer.id).then(() => {
                  toastSuccess(t('offer.successOffer'));
                  props.onApprove && props.onApprove();
                });
              }}
            />
          )}
      </View>
    </View>
  );
}
