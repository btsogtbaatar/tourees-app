import React, { useEffect, useState } from 'react';

import MapView, { Details, LatLng, Marker, Region } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { LocationCircleIcon, LocationIcon } from '../../assets/svg';
import { colors } from '../../constants';
import { AddressType } from '../../modules/request/entities/request.model';
import { Addresses } from '../../modules/shared/page/MapViewAddress/AddressMapView';
import AddressMapViewStyle from '../../modules/shared/page/MapViewAddress/AddressMapView.style';

const DELTA = 0.005;
export const DEFAULT_LAT = 47.92123;
export const DEFAULT_LNG = 106.918556;

export interface CustomMapViewProps {
  addresses: Addresses;
  addressType: AddressType | undefined;
  latLng: LatLng;
  onRegionChangeComplete: (region: Region) => void;
}

const CustomMapView = (props: Readonly<CustomMapViewProps>) => {
  const [latLng, setLatLng] = useState<LatLng>(props.latLng);

  useEffect(() => {
    setLatLng(props.latLng);
  }, [props.latLng]);

  const renderIcon = () => {
    if (props.addressType === AddressType.From) {
      return <LocationCircleIcon width={25} height={25} />;
    } else if (props.addressType === AddressType.To) {
      return <LocationIcon width={25} height={25} />;
    } else {
      return <></>;
    }
  };

  return (
    <MapView
      style={AddressMapViewStyle.map}
      mapType="terrain"
      region={{
        latitude: props.latLng.latitude,
        longitude: props.latLng.longitude,
        latitudeDelta: DELTA,
        longitudeDelta: DELTA,
      }}
      onRegionChange={(region: Region) => {
        if (props.addressType !== undefined) {
          setLatLng({
            latitude: region.latitude,
            longitude: region.longitude,
          });
        }
      }}
      onRegionChangeComplete={(region: Region, details: Details) => {
        if (props.addressType !== undefined && details.isGesture === true) {
          props.onRegionChangeComplete(region);
        }
      }}>
      {props.addresses?.from.address !== undefined &&
        props.addressType !== AddressType.From && (
          <Marker
            coordinate={{
              latitude: props.addresses.from.latitude,
              longitude: props.addresses.from.longitude,
            }}>
            <LocationCircleIcon width={20} height={20} />
          </Marker>
        )}
      {props.addresses?.to.address !== undefined &&
        props.addressType !== AddressType.To && (
          <Marker
            coordinate={{
              latitude: props.addresses.to.latitude,
              longitude: props.addresses.to.longitude,
            }}>
            <LocationIcon width={20} height={20} />
          </Marker>
        )}
      {props.addresses?.from.address !== undefined &&
        props.addresses?.to.address !== undefined && (
          <MapViewDirections
            language="mn"
            mode="WALKING"
            origin={props.addresses.from}
            destination={props.addresses.to}
            apikey={process.env.GOOGLE_API_KEY!}
            strokeColor={colors.primaryColor}
            strokeWidth={2}
          />
        )}
      {latLng !== undefined && props.addressType !== undefined && (
        <Marker coordinate={latLng}>{renderIcon()}</Marker>
      )}
    </MapView>
  );
};

export default CustomMapView;
