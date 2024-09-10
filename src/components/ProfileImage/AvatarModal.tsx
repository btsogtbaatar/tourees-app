import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AvatarModalStyle } from './AvatarModal.style';

interface IProps {
  onCamera: () => void;
  onGallery: () => void
}

const AvatarModal = (props: IProps) => {
  return (
    <View style={AvatarModalStyle.container}>
      <TouchableOpacity style={AvatarModalStyle.titleContainer} onPress={props.onGallery}>
        <Text style={AvatarModalStyle.label}>Зураг оруулах</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={AvatarModalStyle.titleContainer}
        onPress={props.onCamera}
      >
        <Text style={AvatarModalStyle.label}>Зураг дарах</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AvatarModal;
