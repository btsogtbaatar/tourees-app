import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import Geocoder from 'react-native-geocoding';
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import { Colors } from '../../../../constants/Colors';
import { Typography } from '../../../../constants/Typography';
import { RequestModule } from '../../../context/entities/request.model';
import { CustomInputStyle } from '../CustomInput/CustomInput.style';
import { AddressFormStyle } from './AddressForm.style';

export interface AddressFormProps {
  value?: RequestModule.RequestAdditional;
  onChange: (value: RequestModule.RequestAdditional) => void;
}

export default function AddressForm(props: Readonly<AddressFormProps>) {
  const suggestionListRef = useRef<GooglePlacesAutocompleteRef>(null);
  const [borderColor, setBorderColor] = useState(Colors.gray100);

  useEffect(() => {
    console.log('🚀 ~ useEffect ~ props.value:', props.value);

    if (props.value) {
      suggestionListRef.current?.setAddressText(props.value.address!);
    } else {
      suggestionListRef.current?.clear();
    }
  }, [props.value]);

  return (
    <>
      <Text style={[Typography.textSmallBold, { marginBottom: 8 }]}>
        Хаяг оруулах
      </Text>
      <View style={[AddressFormStyle.container]}>
        <GooglePlacesAutocomplete
          currentLocation
          enableHighAccuracyLocation
          ref={suggestionListRef}
          listViewDisplayed={true}
          keepResultsAfterBlur={true}
          currentLocationLabel='Current location'
          placeholder="Хаягаа оруулна уу."
          onPress={(data, details = null) => {
            Geocoder.from(data.description).then(response => {
              let result = response.results[0];

              props.onChange({
                address: data.description,
                latitude: result.geometry.location.lat,
                longitude: result.geometry.location.lng,
              });
            });
          }}
          enablePoweredByContainer={false}
          query={{
            key: process.env.GOOGLE_API_KEY,
            language: 'en',
          }}
          textInputProps={{
            onBlur: () => {
              setBorderColor(Colors.gray100);
            },
            onFocus: () => {
              setBorderColor(Colors.primaryColor);
            },
          }}
          styles={{
            textInput: [Typography.textRegularSemiBold],
            textInputContainer: [
              CustomInputStyle.container,
              { paddingTop: 3, borderColor: borderColor },
            ],
            listView: {
              height: Dimensions.get('screen').height * 0.25
            },
            description: {
              fontFamily: 'Nunito',
            },
          }}
        />
      </View>
    </>
  );
}
