import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';

interface HeaderProps {
  title?: string;
}

function HeaderBack({ title }: HeaderProps) {
  return (
    <TouchableHighlight>
      <View>
        <Text>{title ? title : ''}</Text>
      </View>
    </TouchableHighlight>
  );
}
export default HeaderBack;
