import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity } from 'react-native';
import styles from './RegisterButton.style';

interface ButtonProps {
  selected?: boolean;
  onPress?: () => void;
  text: string;
  icon?: React.ReactNode;
}

export default function RegisterButtton(props: ButtonProps) {
  const { t } = useTranslation();
  return (
    <TouchableOpacity
      style={[
        styles.emailTouch,
        props.selected ? styles.selectedBox : styles.unSelectedBox,
      ]}
      onPress={props.onPress}>
      {props.icon}
      <Text style={styles.textStyle}>{t(props.text)}</Text>
    </TouchableOpacity>
  );
}
