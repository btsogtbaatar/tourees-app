import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import EmailIcon from '../../../assets/svg/Email';
import styles from './RegisterButton.style';
import { Colors } from '../../../../constants/Colors';
import { useTranslation } from 'react-i18next';

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
