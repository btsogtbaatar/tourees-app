import React, {useState} from 'react';
import {
  KeyboardTypeOptions,
  StyleProp,
  Text,
  TextInput,
  TextProps,
} from 'react-native';
import {Colors} from '../../../constants/Colors';
import {
  Control,
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from 'react-hook-form';
import {RegisterModule} from '../../Auth/entities';

interface InputProps {
  value?: string;
  defaultValue?: string;
  extra?: StyleProp<any>;
  onFocus?: any;
  onBlur?: any;
  keyboardType?: KeyboardTypeOptions;
  placeHolder?: string;
  name: 'email' | 'username';
  control: Control<RegisterModule.RegisterStep>;
}

export default function AuthInput(props: InputProps) {
  const [color, setColor] = useState(Colors.brandGray);
  const customOnFocus = () => {
    props.onFocus;
    setColor(Colors.primaryColor);
  };
  const customOnBlur = () => {
    props.onBlur;
    setColor(Colors.brandGray);
  };
  console.log(props.name, 'name');

  return (
    <>
      <Controller
        name={props.name}
        control={props.control}
        render={({field: {onChange, value}, fieldState: {error}}) => {
          return (
            <>
              <TextInput
                value={value}
                placeholder={props.placeHolder}
                onBlur={customOnBlur}
                onFocus={customOnFocus}
                keyboardType={
                  props.keyboardType ? props.keyboardType : 'default'
                }
                style={[props.extra, {borderColor: color}]}
                onChangeText={text => {
                  onChange(text);
                }}
              />
              {error?.message && <Text>{error.message}</Text>}
            </>
          );
        }}
      />
    </>
  );
}
