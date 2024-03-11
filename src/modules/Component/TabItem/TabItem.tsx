import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from '../../Auth/Pages/Auth/Register/Register.style';
import { Typography } from '../../../../constants/Typography';
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
        props.selected ? styles.selectedBox : styles.unSelectedBox,
      ]}
      onPress={props.onSelect}>
      <Text style={[Typography.textSmallBold]}>{props.label}</Text>
    </TouchableOpacity>
  );
}
