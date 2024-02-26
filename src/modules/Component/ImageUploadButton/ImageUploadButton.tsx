import React, { useRef, useState } from 'react';
import { FlatList, View } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import ImageComponent from './ImageComponent';

export type ImageSource = {
  uri?: string;
};
interface ImageUploadButtonProps {
  onImageSelection: (selectedImages: ImageSource[]) => void;
}
const ImageUploadButton: React.FC<ImageUploadButtonProps>= ({onImageSelection}) => {
  const [selectedImages, setSelectedImages] = useState<ImageSource[]>([
    { uri: 'icon' },
  ]);
  const flatlistRef = useRef<FlatList | null>(null);
  const chooseFile = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        console.log(response, 'response');
        if (response.didCancel) {
          console.log('image cancelled');
        } else if (response.errorCode) {
          console.log('image error', response.errorCode);
        } else if (response.assets) {
          const source = { uri: response.assets[0].uri };
          // if (selectedImage.length === 0) {
          //   const newSource = { uri: 'icon' };
          //   setSelectedImage(image => [...image, newSource, source]);
          // } else {
          setSelectedImages([...selectedImages, source]);
          onImageSelection([...selectedImages, source]);
          // }
        }
      },
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <View>
        <FlatList
          ref={flatlistRef}
          data={selectedImages}
          // columnWrapperStyle={{ justifyContent: 'space-around' }}
          numColumns={3}
          onContentSizeChange={() => {
            selectedImages.length > 1 &&
              flatlistRef.current?.scrollToIndex({
                index: selectedImages.findIndex(image => image.uri == 'icon'),
                animated: true,
              });
          }}
          initialNumToRender={2}
          keyExtractor={(_, index:any) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <ImageComponent
                item={item}
                index={index}
                chooseFile={chooseFile}
                selectedImage={selectedImages.length}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

export default ImageUploadButton;
