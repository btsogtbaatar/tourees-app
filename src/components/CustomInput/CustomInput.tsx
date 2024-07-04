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
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { CustomInputStyle } from './CustomInput.style';
import { colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';

export interface CustomInputProps<T extends FieldValues>
  extends Omit<TextInputProps, 'onChange'> {
  name: Path<T>;
  label: string;
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  editable?: boolean;
  onChange?: (text: string) => void;
  extra?: StyleProp<ViewStyle>;
}

export default function CustomInput<T extends FieldValues>(
  props: Readonly<CustomInputProps<T>>,
) {
  const [color, setColor] = useState(colors.gray100);

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
    <View style={props.extra}>
      <View
        style={[
          CustomInputStyle.container,
          {
            borderColor: color,
          },
        ]}>
        <Text style={[props.labelStyle, Typography.textSmallerMedium]}>
          {props.label}
        </Text>
        <TextInput
          editable={props.editable}
          value={value}
          placeholder={props.placeholder}
          onBlur={onBlur}
          onFocus={onFocus}
          keyboardType={props.keyboardType ?? 'default'}
          style={[Typography.textRegularSemiBold, CustomInputStyle.input]}
          onChangeText={(text: string) => {
            onChange(text);
            props.onChange && props.onChange(text);
          }}
        />
      </View>
      {error?.message && (
        <Text style={{ color: colors.danger }}>{error.message}</Text>
      )}
    </View>
  );
}
