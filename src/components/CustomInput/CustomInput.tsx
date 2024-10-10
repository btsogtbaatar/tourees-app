import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
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

export interface CustomInputProps
  extends Omit<TextInputProps, 'onChange' | 'style'> {
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

export interface CustomInputRef {
  focus: () => void;
  clear: () => void;
}

const CustomInput = forwardRef<CustomInputRef, CustomInputProps>(
  (props, ref) => {
    const [color, setColor] = useState(colors.gray100);
    const textInputRef = useRef<TextInput>(null);

    const onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      if (props.onFocus) {
        props.onFocus(e);
      }

      setColor(colors.primaryGradient);
    };

    const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      if (props.onBlur) {
        props.onBlur(e);
      }

      setColor(colors.brandGray);
    };

    const focus = () => {
      textInputRef?.current?.focus();
    };

    const clear = () => {
      textInputRef?.current?.clear();
    };

    useImperativeHandle(ref, () => ({
      focus,
      clear,
    }));

    const renderAction = () => {
      if (props.action) {
        return (
          <Pressable onPress={props.action.onPress}>
            {props.action.icon}
          </Pressable>
        );
      } else if (props.clearButton === true) {
        return (
          <Pressable onPress={() => clear()}>
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
          <Text
            style={[
              props.style?.label,
              Typography.textSmaller,
              { color: colors.gray200 },
            ]}>
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
            <View style={{ flex: 1 }}>
              {renderLabel()}
              <View style={CustomInputStyle.inputContainer}>
                {renderIcon()}
                <TextInput
                  {...props}
                  cursorColor={colors.primaryGradient}
                  selectionColor={colors.primaryGradient}
                  ref={textInputRef}
                  onBlur={onBlur}
                  onFocus={onFocus}
                  multiline={props.numberOfLines ? true : false}
                  style={[
                    CustomInputStyle.input,
                    props.style?.input,
                    props.numberOfLines ? { minHeight: 100 } : {},
                  ]}
                  onChangeText={(text: string) => {
                    props.onChangeText && props.onChangeText(text);
                  }}
                />
              </View>
            </View>
            <View style={CustomInputStyle.action}>{renderAction()}</View>
          </View>
        </View>
      </Pressable>
    );
  },
);

export default CustomInput;
