import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ActiveCircleIcon from '../../assets/svg/auth/ActiveCircleIcon';
import CircleIcon from '../../assets/svg/auth/CircleIcon';
import styles from './UsernameDropdown.style';

interface Props {
  item: any;
  checked?: boolean;
  onPress(value: string): void;
}

const UsernameDropdown = ({ item, checked, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={() => onPress(item.username)}>
      <View
        style={[
          styles.container,
          checked ? styles.checkStyle : styles.unCheck,
        ]}>
        <View style={[styles.subContainer]}>
          {checked ? <ActiveCircleIcon /> : <CircleIcon />}
          <Text style={{ marginLeft: 12 }}>{item}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UsernameDropdown;
