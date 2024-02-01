import React from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import CircleIcon from '../../../assets/svg/auth/CircleIcon';
import ActiveCircleIcon from '../../../assets/svg/auth/ActiveCircleIcon';
import styles from './UsernameDropdown.style';

interface Props {
  item: any;
  extra?: StyleProp<ViewStyle>;
  checked?: boolean;
  textExtra?: StyleProp<TextStyle>;
  onPress(value: string): void;
  check?: string;
}

const UsernameDropdown = ({
  item,
  extra,
  check,
  checked,
  textExtra,
  onPress,
}: Props) => {
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
