import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { SharedModel } from '../../modules/shared/entities/shared.model';
import { SuggestionItemStyle } from './SuggestionItem.style';

export interface SuggestionItemProps {
  place: SharedModel.Place;
  onPress: (place: SharedModel.Place) => void;
}

function SuggestionItem(props: Readonly<SuggestionItemProps>) {
  return (
    <Pressable onPress={() => props.onPress(props.place)}>
      <View style={SuggestionItemStyle.container}>
        <Text numberOfLines={2} style={SuggestionItemStyle.text}>
          {`${props.place.displayName.text}, ${props.place.shortFormattedAddress}`}
        </Text>
      </View>
    </Pressable>
  );
}

export default SuggestionItem;
