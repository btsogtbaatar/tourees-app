import React, { useRef, useState } from 'react';
import { FlatList, View } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import ImageComponent from './ImageComponent';

export type ImageSourse = {
  uri?: string;
};

const ImageUploadButton = () => {
  const [selectedImage, setSelectedImage] = useState<ImageSourse[]>([
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
      response => {
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
          setSelectedImage(image => [...image, source]);
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
          data={selectedImage}
          // columnWrapperStyle={{ justifyContent: 'space-around' }}
          numColumns={3}
          onContentSizeChange={() => {
            selectedImage.length > 0 &&
              flatlistRef.current?.scrollToIndex({
                index: selectedImage.findIndex(image => image.uri == 'icon'),
                animated: true,
              });
          }}
          initialNumToRender={2}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <ImageComponent
                item={item}
                index={index}
                chooseFile={chooseFile}
                selectedImage={selectedImage.length}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

export default ImageUploadButton;
