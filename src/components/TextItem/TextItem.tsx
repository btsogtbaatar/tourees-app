import React from 'react';
import { Text, View } from 'react-native';
import { Typography } from '../../theme';
import TextItemStyle from './TextItem.style';

export interface TextItemProps {
  icon: React.JSX.Element;
  label?: string;
  placeholder?: string;
  hideAction?: boolean;
  buttonText?: string;
  onPress?: () => void;
}

const TextItem = (props: TextItemProps) => {
  return (
    <View style={TextItemStyle.container}>
      {props.icon}
      {props.label && (
        <Text numberOfLines={2} style={TextItemStyle.label}>
          {props.label}
        </Text>
      )}
      {!props.label && props.placeholder && (
        <Text style={TextItemStyle.placeholder}>{props.placeholder}</Text>
      )}
      {props.hideAction !== true && (
        <Text
          onPress={props.onPress}
          style={[Typography.textSmall, TextItemStyle.action]}>
          {props.buttonText}
        </Text>
      )}
    </View>
  );
};

export default TextItem;
