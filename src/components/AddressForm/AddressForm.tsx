import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import Geocoder from 'react-native-geocoding';
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import { colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Address } from '../AddressBottomSheetView/AddressBottomSheetView';
import { CustomInputStyle } from '../CustomInput/CustomInput.style';
import { AddressFormStyle } from './AddressForm.style';

export interface AddressFormProps {
  value?: Address;
  onChange: (value: Address) => void;
}

export default function AddressForm(props: Readonly<AddressFormProps>) {
  const suggestionListRef = useRef<GooglePlacesAutocompleteRef>(null);
  const [borderColor, setBorderColor] = useState(colors.gray100);

  useEffect(() => {
    if (props.value) {
      suggestionListRef.current?.setAddressText(props.value.addressLine2);
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
          debounce={300}
          ref={suggestionListRef}
          keepResultsAfterBlur={true}
          placeholder="Хаягаа оруулна уу."
          onPress={(data, _details = null) => {
            Geocoder.from(data.description).then(response => {
              let result = response.results[0];

              props.onChange({
                addressLine2: result.formatted_address,
                streetAddress: result.formatted_address,
                city: result.address_components[1].long_name,
                latitude: result.geometry.location.lat,
                longitude: result.geometry.location.lng,
              });
            });
          }}
          enablePoweredByContainer={false}
          query={{
            key: process.env.GOOGLE_API_KEY,
            language: 'en',
            components: 'country:mn',
          }}
          textInputProps={{
            onBlur: () => {
              setBorderColor(colors.gray100);
            },
            onFocus: () => {
              setBorderColor(colors.primaryColor);
            },
          }}
          styles={{
            textInput: [Typography.textRegularSemiBold],
            textInputContainer: [
              CustomInputStyle.container,
              { paddingTop: 3, borderColor: borderColor },
            ],
            listView: {
              maxHeight: Dimensions.get('screen').height * 0.2,
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
