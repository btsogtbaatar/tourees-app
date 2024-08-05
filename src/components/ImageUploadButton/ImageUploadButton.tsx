import React, { useRef, useState } from 'react';
import { FlatList, Platform } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import ImagePreview from './ImagePreview';
import ImageUploadButtonStyle from './ImageUploadButton.style';

export type ImageSource = {
  uri?: string;
  name?: string;
  type?: string;
};

interface ImageUploadButtonProps {
  onImageSelection: (selectedImages: ImageSource[]) => void;
}

const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({
  onImageSelection,
}) => {
  const [selectedImages, setSelectedImages] = useState<ImageSource[]>([{}]);
  const flatlistRef = useRef<FlatList<ImageSource> | null>(null);

  const chooseFile = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      response => {
        if (!response.didCancel && !response.errorCode && response.assets) {
          const { uri, fileName, type } = response.assets[0];
          const source: ImageSource = {
            uri: Platform.OS === 'ios' ? uri?.replace('file://', '') : uri,
            name: fileName,
            type,
          };
          setSelectedImages([...selectedImages, source]);
          onImageSelection([...selectedImages, source]);
        }
      },
    );
  };

  return (
    <FlatList
      scrollEnabled={false}
      ref={flatlistRef}
      data={selectedImages}
      columnWrapperStyle={ImageUploadButtonStyle.columnWrapperStyle}
      contentContainerStyle={ImageUploadButtonStyle.contentContainerStyle}
      numColumns={3}
      keyExtractor={(source, index) => index.toString()}
      renderItem={({ item, index }) => (
        <ImagePreview
          item={item}
          index={index}
          chooseFile={chooseFile}
          selectedImage={selectedImages.length}
        />
      )}
    />
  );
};

export default ImageUploadButton;
