import React from 'react';
import { Text, View } from 'react-native';
import { BadgeStyle } from './Badge.style';

export interface BadgeProps {
  text: string;
}

const Badge = (props: BadgeProps) => {
  return (
    <View style={BadgeStyle.container}>
      <Text style={BadgeStyle.text}>{props.text}</Text>
    </View>
  );
};

export default Badge;
