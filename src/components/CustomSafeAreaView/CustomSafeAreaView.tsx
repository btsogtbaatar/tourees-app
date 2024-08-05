import React from 'react';
import { SafeAreaView } from 'react-native';
import { SafeAreaViewProps } from 'react-native-safe-area-context';
import CustomSafeAreaViewStyle from './CustomSafeAreaView.style';

export interface CustomSafeAreaViewProps extends SafeAreaViewProps {}

function CustomSafeAreaView(props: CustomSafeAreaViewProps) {
  return (
    <SafeAreaView
      {...props}
      style={[props.style, CustomSafeAreaViewStyle.container]}
    />
  );
}

export default CustomSafeAreaView;
