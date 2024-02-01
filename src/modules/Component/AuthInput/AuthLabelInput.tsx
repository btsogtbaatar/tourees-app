import React, { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import {
  KeyboardTypeOptions,
  StyleProp,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Colors } from '../../../../constants/Colors';
import { RegisterModule } from '../../Auth/entities';
import styles from './AuthInput.style';
import validations from '../../../uitls/validations';

interface InputProps {
  value?: string;
  defaultValue?: string;
  extra?: StyleProp<any>;
  onFocus?: any;
  onBlur?: any;
  keyboardType?: KeyboardTypeOptions;
  placeHolder?: string;
  name: 'email' | 'username' | 'phone';
  control: Control<RegisterModule.RegisterStep>;
  label?: string;
}

export default function AuthLabelInput(props: InputProps) {
  const [color, setColor] = useState(Colors.brandGray);

  const customOnFocus = () => {
    props.onFocus;
    setColor(Colors.primaryColor);
  };
  const customOnBlur = () => {
    props.onBlur;
    setColor(Colors.brandGray);
  };
  return (
    <>
      <Controller
        name={props.name}
        control={props.control}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          return (
            <>
              <View
                style={[
                  styles.container,
                  props.extra,
                  {
                    borderColor: color,
                  },
                ]}>
                <Text style={styles.label}>{props.label}</Text>
                <TextInput
                  style={styles.inputStyle}
                  placeholder={props.placeHolder}
                  keyboardType={props.keyboardType}
                  value={value}
                  onFocus={customOnFocus}
                  onBlur={customOnBlur}
                  onChangeText={text => {
                    if(props.keyboardType == 'phone-pad'){
                      text = text.replace(validations.digitRev, '');
                    }
                    onChange(text);
                  }}
                />
              </View>
              {error?.message && (
                <Text style={{ color: '#F15980' }}>{error.message}</Text>
              )}
            </>
          );
        }}
      />
    </>
  );
}
