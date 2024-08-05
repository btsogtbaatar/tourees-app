import React from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { PlusIcon } from '../Icon';
import ImagePreviewStyle from './ImagePreview.style';
import { ImageSource } from './ImageUploadButton';

interface ImageComponentProps {
  item: ImageSource;
  index: number;
  chooseFile: () => void;
  selectedImage: number;
}

const ImagePreview = ({
  item,
  index,
  chooseFile,
  selectedImage,
}: ImageComponentProps) => {
  const imageSize = () => {
    return selectedImage - 5;
  };

  if (index < 5) {
    if (index === 0) {
      return (
        <View style={ImagePreviewStyle.container}>
          <TouchableOpacity onPress={chooseFile}>
            <PlusIcon />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={ImagePreviewStyle.container}>
          <Image style={ImagePreviewStyle.imageContainer} source={item} />
        </View>
      );
    }
  } else if (index === 5) {
    return (
      <View style={ImagePreviewStyle.container}>
        <ImageBackground
          style={ImagePreviewStyle.imageBackContainer}
          imageStyle={ImagePreviewStyle.br16}
          resizeMode="stretch"
          source={item}
          blurRadius={10}>
          <Text style={ImagePreviewStyle.imageTitle}>+{imageSize()}</Text>
        </ImageBackground>
      </View>
    );
  } else {
    return <></>;
  }
};

export default ImagePreview;
