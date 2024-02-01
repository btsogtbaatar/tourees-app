import React from 'react';
import { Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import ArrowLeftIcon from '../../../assets/svg/dashboard/ArrowLeftIcon';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  title?: string;
  color?: string;
}

function HeaderBack({ title, color }: HeaderProps) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}>
      <View>
        {title ? <Text>{title}</Text> : <ArrowLeftIcon color={color} />}
      </View>
    </TouchableOpacity>
  );
}
export default HeaderBack;
