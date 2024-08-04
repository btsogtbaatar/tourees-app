import { useHeaderHeight } from '@react-navigation/elements';
import React from 'react';
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
} from 'react-native';

export interface CustomKeyboardAvoidingViewProps
  extends KeyboardAvoidingViewProps {}

export default function CustomKeyboardAvoidingView(
  props: Readonly<CustomKeyboardAvoidingViewProps>,
) {
  const headerHeight = useHeaderHeight();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS !== 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight : 0}
      {...props}
      style={[props.style, { flex: 1 }]}>
      {props.children}
    </KeyboardAvoidingView>
  );
}
