import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Platform, StyleProp, ViewStyle } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import ImagePreview from './ImagePreview';
import ImageUploadButtonStyle from './ImageUploadButton.style';

export type ImageSource = {
  uri?: string;
  name?: string;
  type?: string;
  url?: string;
};

interface ImageUploadButtonProps {
  limit: number;
  onDelete: (index: number) => void;
  onImageSelection: (selectedImages: ImageSource[]) => void;
  extra?: StyleProp<ViewStyle>;
  value?: ImageSource[];
}

const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({
  limit,
  onImageSelection,
  onDelete,
  value,
}) => {
  const [selectedImages, setSelectedImages] = useState<ImageSource[]>([{}]);
  const flatlistRef = useRef<FlatList<ImageSource> | null>(null);

  useEffect(() => {
    if (value) {
      setSelectedImages([{}, ...value]);
    }
  }, [value]);

  const chooseFile = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        selectionLimit: limit,
      },
      response => {
        if (!response.didCancel && !response.errorCode && response.assets) {
          const source = response.assets.map(({ uri, fileName, type }) => {
            return {
              uri: Platform.OS === 'ios' ? uri?.replace('file://', '') : uri,
              name: fileName,
              type,
            } as ImageSource;
          });
          if (limit) {
            const newSelectedImages = [...selectedImages, ...source];
            /*
            `@selectedImages has one initial value so limit needs to be more than one
            */
            if (newSelectedImages.length > limit) {
              newSelectedImages.shift();
            }

            setSelectedImages(newSelectedImages);
          } else {
            setSelectedImages([...selectedImages, ...source]);
          }
          onImageSelection([...source]);
        }
      },
    );
  };
  const _onDelete = (index: number) => {
    const images = selectedImages.filter(
      (val, idx) => idx != index && (val.uri || val.url),
    );

    if (images.length !== limit || images.length === 0) {
      images.unshift({});
    }
    setSelectedImages([...images]);
    onDelete(index);
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
          onDelete={_onDelete}
        />
      )}
    />
  );
};

export default ImageUploadButton;
