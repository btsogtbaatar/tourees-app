import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { LocationCircleIcon } from '../../assets/svg';
import { getAddressFromCoordinates } from '../../utilities';
import AddressForm from '../AddressForm/AddressForm';
import AddressBottomSheetViewStyle from './AddressBottomSheetView.style';

export type Address = {
  addressLine2: string;
  streetAddress: string;
  city: string;
  latitude: number;
  longitude: number;
};

export interface AddressBottomSheetViewProps {
  value?: Address;
  onChange: (response: Address) => void;
}

export default function AddressBottomSheetView(
  props: Readonly<AddressBottomSheetViewProps>,
) {
  const [location, setLocation] = useState<Address>();

  useEffect(() => {
    if (props.value) {
      setLocation(props.value);
    } else {
      setLocation(undefined);
    }
  }, [props.value]);

  return (
    <>
      <View style={{ padding: 16, paddingTop: 0 }}>
        <AddressForm
          value={location}
          onChange={response => {
            setLocation(response);
            props.onChange(response);
          }}
        />
      </View>
      <View style={AddressBottomSheetViewStyle.container}>
        <MapView
          style={AddressBottomSheetViewStyle.map}
          region={{
            latitude: location?.latitude ?? 47.92123,
            longitude: location?.longitude ?? 106.918556,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}>
          {location && (
            <Marker
              draggable
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              onDragEnd={event => {
                getAddressFromCoordinates({
                  latitude: event.nativeEvent.coordinate.latitude,
                  longitude: event.nativeEvent.coordinate.longitude,
                }).then(place => {
                  setLocation(place);
                  props.onChange(place);
                });
              }}>
              <LocationCircleIcon width={50} height={50} />
            </Marker>
          )}
        </MapView>
      </View>
    </>
  );
}
