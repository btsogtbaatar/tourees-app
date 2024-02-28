import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from '../../Auth/Pages/Auth/Register/Register.style';

export interface TabItemProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
}

export default function TabItem(props: Readonly<TabItemProps>) {
  return (
    <TouchableOpacity
      style={[
        styles.tabButton,
        props.selected ? styles.selectedBox : styles.unSelectedBox,
      ]}
      onPress={props.onSelect}>
      <Text style={[styles.tabText, styles.textStyle]}>{props.label}</Text>
    </TouchableOpacity>
  );
}
