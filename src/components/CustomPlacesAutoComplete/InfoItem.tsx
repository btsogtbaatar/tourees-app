import React from 'react';
import { Text, View } from 'react-native';
import { SuggestionItemStyle } from './SuggestionItem.style';

export interface InfoItemProps {
  label: string;
}

function InfoItem(props: InfoItemProps) {
  return (
    <View style={SuggestionItemStyle.container}>
      <Text style={SuggestionItemStyle.infoText}>{props.label}</Text>
    </View>
  );
}

export default InfoItem;
