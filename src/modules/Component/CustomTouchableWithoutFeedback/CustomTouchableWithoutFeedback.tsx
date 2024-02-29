import React from 'react';
import {
  Keyboard,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps
} from 'react-native';

export interface CustomTouchableWithoutFeedbackProps
  extends TouchableWithoutFeedbackProps {}

export default function CustomTouchableWithoutFeedback(
  props: CustomTouchableWithoutFeedbackProps,
) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      {props.children}
    </TouchableWithoutFeedback>
  );
}
