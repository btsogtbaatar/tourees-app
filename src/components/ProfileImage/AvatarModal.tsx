import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import { AvatarModalStyle } from './AvatarModal.style';

interface IProps {
  onCamera: () => void;
  onGallery: () => void;
}

const AvatarModal = (props: IProps) => {
  const { t } = useTranslation();

  return (
    <View style={AvatarModalStyle.container}>
      <TouchableOpacity
        style={AvatarModalStyle.titleContainer}
        onPress={props.onGallery}>
        <Text style={AvatarModalStyle.label}>
          {t('form.profile.uploadPhoto')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={AvatarModalStyle.titleContainer}
        onPress={props.onCamera}>
        <Text style={AvatarModalStyle.label}>
          {t('form.profile.takePhoto')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AvatarModal;
