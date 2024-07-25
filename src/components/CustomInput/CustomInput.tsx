import React, { useRef, useState } from 'react';
import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from 'react-hook-form';
import {
  GestureResponderEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleProp,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { XCircle } from '../../assets/svg';
import { colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { CustomInputStyle } from './CustomInput.style';

export interface CustomInputProps<T extends FieldValues>
  extends Omit<TextInputProps, 'onChange' | 'style'> {
  name: Path<T>;
  label?: string;
  style?: {
    label?: StyleProp<TextStyle>;
    container?: StyleProp<ViewStyle>;
    input?: StyleProp<TextStyle>;
  };
  onChangeText?: (text: string) => void;
  icon?: React.JSX.Element;
  action?: {
    icon: React.JSX.Element;
    onPress: () => void;
  };
  onPress?: (event?: GestureResponderEvent) => void;
  clearButton?: boolean;
}

export default function CustomInput<T extends FieldValues>(
  props: Readonly<CustomInputProps<T>>,
) {
  const [color, setColor] = useState(colors.gray100);
  const textInputRef = useRef<TextInput>(null);

  const form = useFormContext();

  const { control } = form;

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name: props.name,
    control,
  });

  const onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (props.onFocus) {
      props.onFocus(e);
    }

    setColor(colors.primaryColor);
  };

  const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (props.onBlur) {
      props.onBlur(e);
    }

    setColor(colors.brandGray);
  };

  const focus = () => {
    textInputRef.current?.focus();
  };

  const renderAction = () => {
    if (props.action) {
      return (
        <Pressable onPress={props.action.onPress}>
          {props.action.icon}
        </Pressable>
      );
    } else if (props.clearButton === true) {
      return (
        <Pressable onPress={() => textInputRef.current?.clear()}>
          <XCircle
            height={20}
            style={{
              color: colors.borderColor,
              height: 20,
            }}
          />
        </Pressable>
      );
    } else {
      return <></>;
    }
  };

  const renderIcon = () => {
    if (props.icon) {
      return <View style={CustomInputStyle.icon}>{props.icon}</View>;
    } else {
      return <></>;
    }
  };

  const renderLabel = () => {
    if (props.label) {
      return (
        <Text style={[props.style?.label, Typography.textSmaller]}>
          {props.label}
        </Text>
      );
    } else {
      return;
    }
  };

  return (
    <Pressable onPress={props.onPress ?? focus}>
      <View pointerEvents={props.onPress ? 'none' : 'auto'}>
        <View
          style={[
            {
              borderColor: color,
              minHeight: props.label
                ? CustomInputStyle.container.minHeight
                : 40,
            },
            CustomInputStyle.container,
            props.style?.container,
          ]}>
          {renderLabel()}
          <View style={CustomInputStyle.inputContainer}>
            {renderIcon()}
            <TextInput
              {...props}
              ref={textInputRef}
              textBreakStrategy="simple"
              value={value}
              onBlur={onBlur}
              onFocus={onFocus}
              multiline={props.numberOfLines ? true : false}
              style={[
                Typography.textRegular,
                CustomInputStyle.input,
                props.style?.input,
              ]}
              onChangeText={(text: string) => {
                onChange(text);
                props.onChangeText && props.onChangeText(text);
              }}
            />
            <View style={CustomInputStyle.action}>{renderAction()}</View>
          </View>
        </View>
        {error?.message && (
          <Text style={{ color: colors.danger }}>{error.message}</Text>
        )}
      </View>
    </Pressable>
  );
}
