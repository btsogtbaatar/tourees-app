import React from 'react';
import CustomInput, { CustomInputProps } from '../CustomInput/CustomInput';

export interface CustomGooglePlacesAutocompleteProps
  extends CustomInputProps<any> {}

export default function CustomGooglePlacesAutocomplete(
  props: CustomGooglePlacesAutocompleteProps,
) {
  return <CustomInput {...props} />;
}
