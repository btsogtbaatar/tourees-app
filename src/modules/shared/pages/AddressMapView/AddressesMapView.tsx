import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { LatLng, Region } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomGradientButton from '../../../../components/CustomButton/CustomGradientButton';
import CustomMapView from '../../../../components/CustomMapView/CustomMapView';
import AddressCard from '../../../../components/CustomPlacesAutoComplete/AddressCard';
import CustomPlacesAutoComplete from '../../../../components/CustomPlacesAutoComplete/CustomPlacesAutoComplete';
import { RootStackParamList } from '../../../../navigation/types';
import { AddressType } from '../../../Request/entities/request.model';
import { SharedModel } from '../../entities/shared.model';
import AddressMapViewStyle from './AddressMapView.style';

type AddressMapViewProps = NativeStackScreenProps<
  RootStackParamList,
  'AddressesMapView'
>;

export type Addresses = {
  from: Address;
  to: Address;
};

export type Address = {
  name?: AddressType;
  displayName?: string;
  address?: string;
  unit?: string;
  floor?: string;
  apartment?: string;
} & LatLng;

export default function AddressesMapView(props: Readonly<AddressMapViewProps>) {
  const insets = useSafeAreaInsets();
  const [addressType, setAddressType] = useState<AddressType | undefined>(
    props.route.params.addressType,
  );
  const [addresses, setAddresses] = useState<Addresses>(
    props.route.params.addresses,
  );
  const { t } = useTranslation();

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
        if (_addressType === AddressType.From) {
          if (addresses.to.address === undefined) {
            return AddressType.To;
          } else {
            return undefined;
          }
        } else if (_addressType === AddressType.To) {
          if (addresses.from.address === undefined) {
            return AddressType.From;
          } else {
            return undefined;
          }
        }
      });

      return _addresses;
    });
  };

  return (
    <View style={AddressMapViewStyle.container}>
      <View
        style={[AddressMapViewStyle.controllerContainer, { top: insets.top }]}>
        <View style={AddressMapViewStyle.addressContainer}>
          <View style={AddressMapViewStyle.left}>
            <AddressCard
              address={addresses.from}
              onPress={() => setAddressType(AddressType.From)}
              active={addressType === AddressType.From}
            />
          </View>
          <View style={AddressMapViewStyle.right}>
            <AddressCard
              address={addresses.to}
              onPress={() => setAddressType(AddressType.To)}
              active={addressType === AddressType.To}
            />
          </View>
        </View>
        <CustomPlacesAutoComplete
          address={getAddress(addresses)}
          onChange={onPlaceChange}
        />
      </View>
      <CustomMapView
        addresses={addresses}
        addressType={addressType}
        latLng={getAddress(addresses)}
        onRegionChangeComplete={onRegionChangeComplete}
      />
      <CustomGradientButton
        disabled={isDisabled()}
        title={t('b_continue')}
        onPress={() =>
          props.navigation.navigate('AddressesDetail', {
            addresses: addresses,
            onGoBack: (_addresses: Addresses) => {
              props.route.params.onGoBack({ ..._addresses });
              props.navigation.goBack();
            },
          })
        }
      />
    </View>
  );
}
