import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { LatLng, Region } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomMapOneMarker from '../../../../components/CustomMapView/CustomMapOneMarker';
import AddressBannerProps from '../../../../components/CustomPlacesAutoComplete/AddressBanner';
import CustomPlacesAutoComplete from '../../../../components/CustomPlacesAutoComplete/CustomPlacesAutoComplete';
import FooterButton from '../../../../components/FooterButton/FooterButton';
import { LocationCircleIcon } from '../../../../components/Icon';
import { RootStackParamList } from '../../../../navigation/types';
import { colors } from '../../../../theme';
import { SharedModel } from '../../entities/shared.model';
import AddressMapViewStyle from './AddressMapView.style';

type AddressMapViewProps = NativeStackScreenProps<
  RootStackParamList,
  'AddressMapView'
>;
export type Address = {
  displayName?: string;
  address?: string;
  unit?: string;
  floor?: string;
  apartment?: string;
  formattedAddress?: string;
} & LatLng;

export default function AddressMapView(props: Readonly<AddressMapViewProps>) {
  const insets = useSafeAreaInsets();
  const { prevAddress, onGoBack, title } = props.route.params;
  const [address, setAddress] = useState<Address>(prevAddress);
  const { t } = useTranslation();

  const isDisabled = () => address.address === undefined;

  const onRegionChangeComplete = (region: Region) => {
    setAddress(_prev => {
      return {
        ..._prev,
        ...address,
        ...region,
      };
    });
  };

  const onPlaceChange = (place: SharedModel.Place) => {
    setAddress(_prev => {
      let address = {
        displayName: place.displayName.text,
        address: `${place?.displayName.text}, ${place?.shortFormattedAddress}`,
        latitude: place.location.latitude,
        longitude: place.location.longitude,
        formattedAddress: place.formattedAddress,
      };

      let _addresses = {
        ..._prev,
        ...address,
      };
      return _addresses;
    });
  };

  return (
    <View style={AddressMapViewStyle.container}>
      <View
        style={[AddressMapViewStyle.controllerContainer, { top: insets.top }]}>
        <View style={AddressMapViewStyle.addressContainer}>
          <View style={AddressMapViewStyle.left}>
            <AddressBannerProps
              address={address}
              icon={
                <LocationCircleIcon
                  color={colors.primaryGradient}
                  width={20}
                  height={20}
                />
              }
              text={title}
            />
          </View>
        </View>
        <CustomPlacesAutoComplete address={address} onChange={onPlaceChange} />
      </View>
      <CustomMapOneMarker
        address={address}
        latLng={address}
        onRegionChangeComplete={onRegionChangeComplete}
      />
      <FooterButton
        style={{
          container: {
            position: 'absolute',
            bottom: insets.bottom,
          },
        }}
        disabled={isDisabled()}
        text={t('addressMapView.continue')}
        onPress={() => {
          onGoBack(address);
          props.navigation.goBack();
        }}
      />
    </View>
  );
}
