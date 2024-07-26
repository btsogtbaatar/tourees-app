import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomImage from '../CustomImage/CustomImage';
import ImageItemStyle from './ImageItem.style';

export type ImageItem = {
  imageUrl?: string;
  title: string;
};

export interface ImageItemProps {
  item: ImageItem;
  onPress: () => void;
}

const ImageItem = (props: ImageItemProps) => {
  const getImageSource = () => {
    if (props.item.imageUrl) {
      return {
        uri: props.item.imageUrl,
      };
    } else {
      return require('../../../assets/images/icon-placeholder.png');
    }
  };

  return (
    <TouchableOpacity style={ImageItemStyle.container} onPress={props.onPress}>
      <CustomImage style={ImageItemStyle.image} source={getImageSource()} />
      <Text numberOfLines={2} style={ImageItemStyle.title}>
        {props.item.title}
      </Text>
    </TouchableOpacity>
  );
};

export default ImageItem;
