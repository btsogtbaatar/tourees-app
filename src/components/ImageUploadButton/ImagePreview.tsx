import React from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { colors } from '../../theme';
import { PlusIcon, XCircleIcon } from '../Icon';
import ImagePreviewStyle from './ImagePreview.style';
import { ImageSource } from './ImageUploadButton';
import CustomImage from '../CustomImage/CustomImage';
import { horizontalScale, moderateScale } from '../../utilities';

interface ImageComponentProps {
  item: ImageSource;
  index: number;
  chooseFile: () => void;
  onDelete: (index: number) => void;
}

const ImagePreview = ({
  item,
  index,
  chooseFile,
  onDelete,
}: ImageComponentProps) => {
  if (!item.uri) {
    if (!item.url) {
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
          <CustomImage
            source={{ uri: item.url }}
            width={horizontalScale(72)}
            height={horizontalScale(72)}
            style={ImagePreviewStyle.imageContainer}
            resizeMode="cover"
          />
        </View>
      );
    }
  } else {
    return (
      <View style={ImagePreviewStyle.container}>
        <ImageBackground
          style={ImagePreviewStyle.imageContainer}
          imageStyle={ImagePreviewStyle.br16}
          source={item}>
          <TouchableOpacity
            style={ImagePreviewStyle.delete}
            onPress={() => {
              onDelete(index);
            }}>
            <XCircleIcon color={colors.primary500} />
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
};

export default ImagePreview;
