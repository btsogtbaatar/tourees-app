import React, { useEffect, useState } from 'react';

import MapView, { LatLng, Marker, Region } from 'react-native-maps';
import { LocationCircleIcon } from '../../assets/svg';
import AddressMapViewStyle from '../../modules/shared/page/MapViewAddress/AddressMapView.style';

const DELTA = 0.005;
export const DEFAULT_LAT = 47.92123;
export const DEFAULT_LNG = 106.918556;

export interface CustomMapViewProps {
  lat: number;
  lng: number;
  onRegionChangeComplete: (region: Region) => void;
}

const CustomMapView = (props: Readonly<CustomMapViewProps>) => {
  const [latLng, setLatLng] = useState<LatLng>();

  useEffect(() => {
    let propLatLng: LatLng = {
      latitude: props.lat,
      longitude: props.lng,
    };

    setLatLng(propLatLng);
  }, [props.lat, props.lng]);

  return (
    <MapView
      style={AddressMapViewStyle.map}
      mapType="none"
      region={{
        latitude: latLng?.latitude ?? DEFAULT_LAT,
        longitude: latLng?.longitude ?? DEFAULT_LNG,
        latitudeDelta: DELTA,
        longitudeDelta: DELTA,
      }}
      onRegionChange={(region: Region) =>
        setLatLng({
          latitude: region.latitude,
          longitude: region.longitude,
        })
      }
      onRegionChangeComplete={props.onRegionChangeComplete}>
      {latLng ? (
        <Marker coordinate={latLng}>
          <LocationCircleIcon width={25} height={25} />
        </Marker>
      ) : (
        <></>
      )}
    </MapView>
  );
};

export default CustomMapView;
