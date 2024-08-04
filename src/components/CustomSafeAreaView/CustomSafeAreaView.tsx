import React from 'react';
import { SafeAreaView } from 'react-native';
import { SafeAreaViewProps } from 'react-native-safe-area-context';

export interface CustomSafeAreaViewProps extends SafeAreaViewProps {}

function CustomSafeAreaView(props: CustomSafeAreaViewProps) {
  return <SafeAreaView {...props} style={[props.style, { flex: 1 }]} />;
}

export default CustomSafeAreaView;
