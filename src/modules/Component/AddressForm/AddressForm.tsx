import React, { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import { Colors } from '../../../../constants/Colors';
import { Typography } from '../../../../constants/Typography';
import { CustomInputStyle } from '../CustomInput/CustomInput.style';
import { AddressFormStyle } from './AddressForm.style';
import Geocoder from 'react-native-geocoding';

export interface AddressFormProps {
  value?: Geocoder.LatLng;
  onSubmit: (value: Geocoder.GeocoderResponse) => void;
}

export default function AddressForm(props: Readonly<AddressFormProps>) {
  const suggestionListRef = useRef<GooglePlacesAutocompleteRef>(null);
  const [borderColor, setBorderColor] = useState(Colors.gray100);

  useEffect(() => {
    if (props.value) {
      Geocoder.from(props.value).then(response => {
        let places = response.results.filter(types =>
          types.types.filter(_type => _type === 'route').length > 0,
        );

        if (places) {
          suggestionListRef.current?.setAddressText(
            places[0].formatted_address,
          );
        }
      });
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
          placeholder="Хаягаа оруулна уу."
          onPress={(data, details = null) => {
            Geocoder.from(data.description).then(response => {
              props.onSubmit(response);
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
            description: {
              fontFamily: 'Nunito',
            },
          }}
        />
      </View>
    </>
  );
}
