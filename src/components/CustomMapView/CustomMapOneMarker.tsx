import React, { useEffect, useState } from 'react';
import MapView, { Details, LatLng, Marker, Region } from 'react-native-maps';
import { Address } from '../../modules/Shared/pages/AddressMapView/AddressMapView';
import AddressMapViewStyle from '../../modules/Shared/pages/AddressMapView/AddressMapView.style';
import { LocationCircleIcon } from '../Icon';

const DELTA = 0.005;
export const DEFAULT_LAT = 47.92123;
export const DEFAULT_LNG = 106.918556;

export interface CustomMapViewProps {
  address: Address;
  latLng: LatLng;
  onRegionChangeComplete: (region: Region) => void;
}

const CustomMapOneMarker = (props: Readonly<CustomMapViewProps>) => {
  const [latLng, setLatLng] = useState<LatLng>(props.latLng);

  useEffect(() => {
    setLatLng(props.latLng);
  }, [props.latLng]);
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
        setLatLng({
          latitude: region.latitude,
          longitude: region.longitude,
        });
      }}
      onRegionChangeComplete={(region: Region, details: Details) => {
        props.onRegionChangeComplete(region);
      }}>
      <Marker coordinate={latLng}>
        {<LocationCircleIcon width={25} height={25} />}
      </Marker>
    </MapView>
  );
};

export default CustomMapOneMarker;
