import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Typography } from '../../constants/typography';
import styles from '../../modules/auth/pages/Register/Register.style';
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
      <Text style={[Typography.textSmall]}>{props.label}</Text>
    </TouchableOpacity>
  );
}
