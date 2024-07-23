import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Trash } from '../../assets/svg';
import { SharedModel } from '../../modules/shared/entities/shared.model';
import { SelectedPlaceStyles } from './SelectedPlace.style';

export interface SelectedPlaceProps {
  place: SharedModel.Place;
  onDelete: () => void;
}

function SelectedPlace(props: SelectedPlaceProps) {
  return (
    <View style={SelectedPlaceStyles.selectedAddressContainer}>
      <View style={SelectedPlaceStyles.textContainer}>
        <Text style={SelectedPlaceStyles.selectedAddressLabel}>
          Сонгосон хаяг
        </Text>
        <Text
          style={
            SelectedPlaceStyles.selectedAddress
          }>{`${props.place?.displayName.text}, ${props.place?.shortFormattedAddress}`}</Text>
      </View>
      <Pressable
        onPress={props.onDelete}
        style={SelectedPlaceStyles.actionContainer}>
        <Trash height={20} style={SelectedPlaceStyles.action} />
      </Pressable>
    </View>
  );
}

export default SelectedPlace;
