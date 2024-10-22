import React from 'react';
import { Text } from 'react-native';
import CustomCurrenctViewStyle from './CustomCurrencyView.style';

export interface CustomCurrenctViewProps {
  amount?: number;
}

const CustomCurrencyView = (props: CustomCurrenctViewProps) => {
  const { amount } = props;
  return (
    <Text style={CustomCurrenctViewStyle.title}>
      {Intl.NumberFormat().format(amount ?? 0)}₮
    </Text>
  );
};

export default CustomCurrencyView;
