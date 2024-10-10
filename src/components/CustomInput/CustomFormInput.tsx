import React from 'react';
import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from 'react-hook-form';
import { View } from 'react-native';
import FormError from '../FormError/FormError';
import CustomInput, { CustomInputProps } from './CustomInput';

export interface CustomFormInputProps<T extends FieldValues>
  extends CustomInputProps {
  name: Path<T>;
}

export default function CustomFormInput<T extends FieldValues>(
  props: CustomFormInputProps<T>,
) {
  const form = useFormContext();

  const { control } = form;

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name: props.name,
    control,
  });

  return (
    <View>
      <CustomInput
        {...props}
        value={value}
        onChangeText={(text) => onChange(text)}
      />
      {error?.message && <FormError error={error.message} />}
    </View>
  );
}
