import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View } from 'react-native';
import { LatLng } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomMapView from '../../../../components/CustomMapView/CustomMapView';
import CustomPlacesAutoComplete from '../../../../components/CustomPlacesAutoComplete/CustomPlacesAutoComplete';
import FooterButton from '../../../../components/FooterButton/FooterButton';
import { RootStackParamList } from '../../../../navigation/types';
import { SharedModel } from '../../entities/shared.model';
import AddressMapViewStyle from './AddressMapView.style';

type AddressMapViewProps = NativeStackScreenProps<
  RootStackParamList,
  'AddressMapView'
>;

export type Address = {
  name?: string;
  address?: string;
} & LatLng;

export default function AddressMapView(props: Readonly<AddressMapViewProps>) {
  const insets = useSafeAreaInsets();
  const routeAddress = props.route.params.address;
  const [address, setAddress] = useState<Address>(routeAddress);

  return (
    <View style={AddressMapViewStyle.container}>
      <View style={[AddressMapViewStyle.searchContainer, { top: insets.top }]}>
        <CustomPlacesAutoComplete
          latLng={address}
          onChange={(place: SharedModel.Place) =>
            setAddress({
              ...address,
              address: `${place?.displayName.text}, ${place?.shortFormattedAddress}`,
              latitude: place.location.latitude,
              longitude: place.location.longitude,
            })
          }
        />
      </View>
      <CustomMapView
        lat={address.latitude}
        lng={address.longitude}
        onRegionChangeComplete={setAddress}
      />
      <FooterButton
        backColor
        extra={{
          position: 'absolute',
          bottom: insets.bottom,
        }}
        back={true}
        btnDisabled={!address}
        text={'Болсон'}
        onPress={() => {
          props.route.params.onGoBack(address);
          props.navigation.goBack();
        }}
        onBackPress={() => props.navigation.goBack()}
      />
    </View>
  );
}
