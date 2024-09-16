import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { RegisterStyle } from '../../modules/Auth/pages/Register/Register.style';
import { Typography } from '../../theme/typography';
import { TabItemStyle } from './TabItem.style';

export interface TabItemProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
}

export default function TabItem(props: Readonly<TabItemProps>) {
  return (
    <TouchableOpacity
      style={[
        TabItemStyle.tabButton,
        props.selected
          ? RegisterStyle.selectedBox
          : RegisterStyle.unSelectedBox,
      ]}
      onPress={props.onSelect}>
      <Text style={[Typography.textSmall]}>{props.label}</Text>
    </TouchableOpacity>
  );
}
