import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AddressForm from '../AddressForm/AddressForm';
import AddressBottomSheetViewStyle from './AddressBottomSheetView.style';
import { LocationCircleIcon } from '../../../assets/svg';
import Geocoder from 'react-native-geocoding';

export interface AddressBottomSheetViewProps {
  onSubmit: (response: Geocoder.GeocoderResponse) => void;
}

export default function AddressBottomSheetView(
  props: AddressBottomSheetViewProps,
) {
  const [location, setLocation] = useState<Geocoder.LatLng>();

  useEffect(() => {
    setLocation(undefined);
  }, [])

  return (
    <>
      <View style={{ padding: 16, paddingTop: 0 }}>
        <AddressForm
          value={location}
          onSubmit={response => {
            setLocation(response.results[0].geometry.location);
            props.onSubmit(response);
          }}
        />
      </View>
      <View style={AddressBottomSheetViewStyle.container}>
        <MapView
          zoomTapEnabled
          zoomControlEnabled
          style={AddressBottomSheetViewStyle.map}
          region={{
            latitude: location?.lat ?? 47.92123,
            longitude: location?.lng ?? 106.918556,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}>
          {location && (
            <Marker
              draggable
              coordinate={{
                latitude: location.lat,
                longitude: location.lng,
              }}
              onDragEnd={event => {
                setLocation({
                  lat: event.nativeEvent.coordinate.latitude,
                  lng: event.nativeEvent.coordinate.longitude,
                });
              }}>
              <LocationCircleIcon></LocationCircleIcon>
            </Marker>
          )}
        </MapView>
      </View>
    </>
  );
}
