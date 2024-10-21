import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import CurrencyInput, { CurrencyInputProps } from 'react-native-currency-input';
import { colors } from '../../theme';
import { CustomCurrencyInputStyle } from './CustomCurrencyInput.style';

const CustomCurrencyInput = (props: CurrencyInputProps) => {
  const [value, setValue] = useState<number | null>(props.value);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setValue(props.value);
  }, [props.value])
  
  return (
    <View
      style={[
        CustomCurrencyInputStyle.formController,
        {
          borderBottomColor: focused ? colors.primaryGradient : colors.gray100,
        },
      ]}>
      <CurrencyInput
        style={CustomCurrencyInputStyle.text}
        value={value}
        onChangeValue={(value: number | null) => {
          setValue(value);
          
          if (props.onChangeValue) {
            props.onChangeValue(value);
          }
        }}
        delimiter=","
        separator="."
        suffix="₮"
        precision={0}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        returnKeyType="done"
      />
    </View>
  );
};

export default CustomCurrencyInput;
