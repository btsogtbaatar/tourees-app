import React from 'react';
import {
  Image,
  ImageBackground,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { PlusIcon } from '../Icon';
import ImagePreviewStyle from './ImagePreview.style';
import { ImageSource } from './ImageUploadButton';

interface ImageComponentProps {
  item: ImageSource;
  index: number;
  chooseFile: () => void;
  selectedImage: number;
  extra?: StyleProp<ViewStyle>;
  limitSize?: number;
}

const ImagePreview = ({
  item,
  index,
  chooseFile,
  selectedImage,
  extra,
  limitSize,
}: ImageComponentProps) => {
  const imageSize = () => {
    return selectedImage - 5;
  };

  if (index < (limitSize ?? 5)) {
    if (index === 0) {
      return (
        <View style={[ImagePreviewStyle.container, extra]}>
          <TouchableOpacity onPress={chooseFile}>
            <PlusIcon />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={[ImagePreviewStyle.container, extra]}>
          <Image style={ImagePreviewStyle.imageContainer} source={item} />
        </View>
      );
    }
  } else if (index === (limitSize ?? 5)) {
    return (
      <View style={[ImagePreviewStyle.container]}>
        <ImageBackground
          style={ImagePreviewStyle.imageBackContainer}
          imageStyle={ImagePreviewStyle.br16}
          resizeMode="stretch"
          source={item}
          blurRadius={10}
        >
          <Text style={ImagePreviewStyle.imageTitle}>+{imageSize()}</Text>
        </ImageBackground>
      </View>
    );
  } else {
    return <></>;
  }
};

export default ImagePreview;
