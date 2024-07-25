import React, { useRef, useState } from 'react';
import { FlatList, View } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import ImageComponent from './ImageComponent';

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
        if (response.didCancel) {
          console.log('Image selection cancelled');
        } else if (response.errorCode) {
          console.log('Image selection error:', response.errorCode);
        } else if (response.assets) {
          const { uri, fileName, type } = response.assets[0];
          const source: ImageSource = { uri, name: fileName, type };
          setSelectedImages([...selectedImages, source]);
          onImageSelection([...selectedImages, source]);
        }
      },
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        scrollEnabled={false}
        ref={flatlistRef}
        data={selectedImages}
        numColumns={3}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <ImageComponent
            item={item}
            index={index}
            chooseFile={chooseFile}
            selectedImage={selectedImages.length}
          />
        )}
      />
    </View>
  );
};

export default ImageUploadButton;
