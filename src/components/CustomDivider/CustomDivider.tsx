// react native component that accepts string as a prop
import React, { PropsWithChildren } from 'react';
import { Text, View } from 'react-native';
import { Typography } from '../../theme';
import CustomDividerStyle from './CustomDivider.style';

const CustomDivider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <View style={CustomDividerStyle.dividerContainer}>
      <View style={CustomDividerStyle.dividerLine} />
      <Text style={Typography.textSmall}>{children}</Text>
      <View style={CustomDividerStyle.dividerLine} />
    </View>
  );
};

export default CustomDivider;
