import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { LocationCircleIcon } from '../../../assets/svg';
import { RequestModule } from '../../../context/entities/request.model';
import AddressForm from '../AddressForm/AddressForm';
import AddressBottomSheetViewStyle, {
  silverMapStyle,
} from './AddressBottomSheetView.style';
import { getAddressFromCoordinates } from '../../../uitls/map';

export interface AddressBottomSheetViewProps {
  value?: RequestModule.RequestAdditional;
  onChange: (response: RequestModule.RequestAdditional) => void;
}

export default function AddressBottomSheetView(
  props: Readonly<AddressBottomSheetViewProps>,
) {
  const [location, setLocation] = useState<RequestModule.RequestAdditional>();

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
          customMapStyle={silverMapStyle}
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
              <LocationCircleIcon></LocationCircleIcon>
            </Marker>
          )}
        </MapView>
      </View>
    </>
  );
}
