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
import { colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { XCircleIcon } from '../Icon';
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

    setColor(colors.primary500);
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
          <XCircleIcon
            height={20}
            style={{
              color: colors.gray200,
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
            },
            CustomInputStyle.container,
            props.style?.container,
          ]}>
          {renderLabel()}
          <View style={CustomInputStyle.inputContainer}>
            {renderIcon()}
            <TextInput
              {...props}
              cursorColor={colors.primary500}
              selectionColor={colors.primary500}
              ref={textInputRef}
              textBreakStrategy="simple"
              value={value}
              onBlur={onBlur}
              onFocus={onFocus}
              multiline={props.numberOfLines ? true : false}
              style={[
                Typography.textSmall,
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
