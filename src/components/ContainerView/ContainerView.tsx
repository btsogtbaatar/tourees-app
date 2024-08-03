import React from 'react';
import { View, ViewProps } from 'react-native';
import styles from '../../modules/auth/pages/Register/Register.style';

export interface ContainerViewProps extends ViewProps {}
export default function ContainerView(props: Readonly<ContainerViewProps>) {
  return <View style={styles.container}>{props.children}</View>;
}
