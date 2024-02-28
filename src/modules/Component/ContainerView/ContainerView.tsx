import React, { ReactNode } from 'react';
import { View, ViewProps } from 'react-native';
import styles from '../../Auth/Pages/Auth/Register/Register.style';

export interface ContainerViewProps extends ViewProps {}
export default function ContainerView(props: Readonly<ContainerViewProps>) {
  return <View style={styles.container}>{props.children}</View>;
}
