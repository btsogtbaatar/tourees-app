import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View } from 'react-native';
import { LatLng, Region } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomMapView from '../../../../components/CustomMapView/CustomMapView';
import CustomPlacesAutoComplete from '../../../../components/CustomPlacesAutoComplete/CustomPlacesAutoComplete';
import SelectedAddress from '../../../../components/CustomPlacesAutoComplete/SelectedAddress';
import FooterButton from '../../../../components/FooterButton/FooterButton';
import { RootStackParamList } from '../../../../navigation/types';
import { AddressType } from '../../../request/entities/request.model';
import { SharedModel } from '../../entities/shared.model';
import AddressMapViewStyle from './AddressMapView.style';

type AddressMapViewProps = NativeStackScreenProps<
  RootStackParamList,
  'AddressMapView'
>;

export type Addresses = {
  from: Address;
  to: Address;
};

export type Address = {
  name?: AddressType;
  displayName?: string;
  address?: string;
} & LatLng;

export default function AddressMapView(props: Readonly<AddressMapViewProps>) {
  const addressTypeMapping: { [key: string]: AddressType | undefined } = {
    [AddressType.From]: AddressType.To,
    [AddressType.To]: undefined,
  };
  const insets = useSafeAreaInsets();
  const [addressType, setAddressType] = useState<AddressType | undefined>(
    props.route.params.addressType,
  );
  const [addresses, setAddresses] = useState<Addresses>(
    props.route.params.addresses,
  );

  const getAddress = (_addresses: Addresses) => {
    if (addressType === AddressType.From) {
      return addresses.from;
    } else {
      return addresses.to;
    }
  };

  const isDisabled = () =>
    addresses.from.address === undefined || addresses.to.address === undefined;

  const onRegionChangeComplete = (region: Region) => {
    setAddresses(_prev => {
      if (addressType === AddressType.From) {
        return {
          ..._prev,
          from: {
            ..._prev.from,
            address: undefined,
            displayName: undefined,
            ...region,
          },
        };
      } else {
        return {
          ..._prev,
          to: {
            ..._prev.to,
            address: undefined,
            displayName: undefined,
            ...region,
          },
        };
      }
    });
  };

  const onPlaceChange = (place: SharedModel.Place) => {
    setAddresses(_prev => {
      let address = {
        name: addressType,
        displayName: place.displayName.text,
        address: `${place?.displayName.text}, ${place?.shortFormattedAddress}`,
        latitude: place.location.latitude,
        longitude: place.location.longitude,
      };

      let _addresses;

      if (addressType === AddressType.From) {
        _addresses = {
          ..._prev,
          from: address,
        };
      } else {
        _addresses = {
          ..._prev,
          to: address,
        };
      }

      setAddressType(_addressType => {
        if (_addressType !== undefined) {
          return addressTypeMapping[_addressType.toString()];
        }
      });

      return _addresses;
    });
  };

  return (
    <View style={AddressMapViewStyle.container}>
      <View style={[AddressMapViewStyle.searchContainer, { top: insets.top }]}>
        <View style={AddressMapViewStyle.selectedAddressContainer}>
          <View style={AddressMapViewStyle.leftSelectedAdress}>
            <SelectedAddress
              address={addresses.from}
              onPress={() => setAddressType(AddressType.From)}
              active={addressType === AddressType.From}
            />
          </View>
          <View style={AddressMapViewStyle.rightSelectedAdress}>
            <SelectedAddress
              address={addresses.to}
              onPress={() => setAddressType(AddressType.To)}
              active={addressType === AddressType.To}
            />
          </View>
        </View>
        <CustomPlacesAutoComplete
          latLng={getAddress(addresses)}
          onChange={onPlaceChange}
        />
      </View>
      <CustomMapView
        addresses={addresses}
        addressType={addressType}
        latLng={getAddress(addresses)}
        onRegionChangeComplete={onRegionChangeComplete}
      />
      <FooterButton
        backColor
        extra={{
          position: 'absolute',
          bottom: insets.bottom,
        }}
        back={true}
        btnDisabled={isDisabled()}
        text={'Болсон'}
        onPress={() => {
          props.route.params.onGoBack(addresses);
          console.log('🚀 ~ AddressMapView ~ addresses:', addresses);
          props.navigation.goBack();
        }}
        onBackPress={() => props.navigation.goBack()}
      />
    </View>
  );
}
