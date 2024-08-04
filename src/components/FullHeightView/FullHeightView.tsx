import React from 'react';
import { View, ViewProps } from 'react-native';

export interface FullHeightViewProps extends ViewProps {}

export default function FullHeightView(props: FullHeightViewProps) {
  return (
    <View {...props} style={[props.style, { flex: 1 }]}>
      {props.children}
    </View>
  );
}
