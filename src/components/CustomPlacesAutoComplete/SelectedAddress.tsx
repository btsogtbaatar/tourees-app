import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LocationCircleIcon, LocationIcon } from '../../assets/svg';
import { colors } from '../../constants';
import { AddressType } from '../../modules/request/entities/request.model';
import { Address } from '../../modules/shared/page/MapViewAddress/AddressMapView';
import { SelectedPlaceStyles } from './SelectedAddress.style';

export interface SelectedAddressProps {
  active: boolean;
  address: Address;
  onPress: (address: Address) => void;
}

function SelectedAddress(props: SelectedAddressProps) {
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      onPress={() => props.onPress(props.address)}
      style={[
        SelectedPlaceStyles.selectedAddressContainer,
        {
          borderColor: props.active ? colors.borderPrimaryColor : 'transparent',
        },
      ]}>
      <View style={SelectedPlaceStyles.iconContainer}>
        {props.address.name === AddressType.From ? (
          <LocationCircleIcon width={20} height={20} />
        ) : (
          <LocationIcon width={20} height={20} />
        )}
      </View>
      <View style={SelectedPlaceStyles.textContainer}>
        {props.address.displayName ? (
          <Text numberOfLines={2} style={SelectedPlaceStyles.selectedAddress}>
            {props.address.displayName}
          </Text>
        ) : (
          <Text style={SelectedPlaceStyles.unselectedAddress}>
            {props.address.name === AddressType.From
              ? t('request.requestDestinationAddress')
              : t('request.requestDeliveryAddress')}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default SelectedAddress;
