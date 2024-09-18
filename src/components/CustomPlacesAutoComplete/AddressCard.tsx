import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AddressType } from '../../modules/Request/entities/request.model';
import { Address } from '../../modules/Shared/pages/AddressMapView/AddressesMapView';
import { LocationCircleIcon, LocationIcon } from '../Icon';
import { AddressCardStyles } from './AddressCard.style';

export interface AddressCardProps {
  active: boolean;
  address: Address;
  onPress: (address: Address) => void;
}

function AddressCard(props: Readonly<AddressCardProps>) {
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      onPress={() => props.onPress(props.address)}
      style={[
        AddressCardStyles.card,
        props.active
          ? AddressCardStyles.selected
          : AddressCardStyles.unselected,
      ]}>
      <View style={AddressCardStyles.iconContainer}>
        {props.address.name === AddressType.From ? (
          <LocationCircleIcon width={20} height={20} />
        ) : (
          <LocationIcon width={20} height={20} />
        )}
      </View>
      <View style={AddressCardStyles.textContainer}>
        {props.address.displayName ? (
          <Text
            numberOfLines={2}
            style={[
              AddressCardStyles.addressText,
              AddressCardStyles.selectedText,
            ]}>
            {props.address.displayName}
          </Text>
        ) : (
          <Text
            style={[
              AddressCardStyles.addressText,
              AddressCardStyles.unselectedText,
            ]}>
            {props.address.name === AddressType.From
              ? t('request.requestDestinationAddress')
              : t('request.requestDeliveryAddress')}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default AddressCard;
