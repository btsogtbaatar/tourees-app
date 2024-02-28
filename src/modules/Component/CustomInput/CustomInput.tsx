import React, { useState } from 'react';
import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from 'react-hook-form';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleProp,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextStyle,
  View,
} from 'react-native';
import { colors } from '../../../constants/colors';
import styles from '../AuthInput/AuthInput.style';

interface CustomInputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
}

export default function CustomInput<T extends FieldValues>(
  props: Readonly<CustomInputProps<T>>,
) {
  const [color, setColor] = useState(colors.brandGray);

  const form = useFormContext();

  const { control } = form;

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name: props.name,
    control,
  });

  const onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (props.onFocus) {
      props.onFocus(e);
    }

    setColor(colors.primaryColor);
  };

  const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (props.onBlur) {
      props.onBlur(e);
    }
    setColor(colors.brandGray);
  };

  return (
    <View
      style={[
        styles.container,
        props.labelStyle,
        {
          borderColor: color,
        },
      ]}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        value={value}
        placeholder={props.placeholder}
        onBlur={onBlur}
        onFocus={onFocus}
        keyboardType={props.keyboardType ?? 'default'}
        style={[props.inputStyle, { borderColor: color }]}
        onChangeText={onChange}
      />
      {error?.message && (
        <Text style={{ color: colors.danger }}>{error.message}</Text>
      )}
    </View>
  );
}
