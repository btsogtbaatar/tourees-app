// react native component that accepts string as a prop
import React, { PropsWithChildren } from 'react';
import { View, Text } from 'react-native';
import CustomDividerStyle from './CustomDivider.style';
import { Typography } from '../../constants';

const CustomDivider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <View style={CustomDividerStyle.dividerContainer}>
      <View style={CustomDividerStyle.dividerLine} />
      <Text style={Typography.textSmallBold}>{children}</Text>
      <View style={CustomDividerStyle.dividerLine} />
    </View>
  );
};

export default CustomDivider;
