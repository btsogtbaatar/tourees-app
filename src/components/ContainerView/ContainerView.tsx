import React from 'react';
import { View, ViewProps } from 'react-native';
import ContainerViewStyles from './ContainerView.style';

export interface ContainerViewProps extends ViewProps {}
export default function ContainerView(props: Readonly<ContainerViewProps>) {
  return (
    <View style={[props.style, ContainerViewStyles.container]}>
      {props.children}
    </View>
  );
}
