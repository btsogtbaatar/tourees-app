import React, { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { horizontalScale, verticalScale } from '../../../uitls/metrics';
import { Colors } from '../../../../constants/Colors';
import { PlusIcon } from '../../../assets/svg';
import * as ImagePicker from 'react-native-image-picker';

type ImageSourse = {
  uri?: string;
};

const ImageUploadButton = () => {
  const [selectedImage, setSelectedImage] = useState<ImageSourse[]>([]);
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
          setSelectedImage(image => [...image, source]);
        }
      },
    );
  };
  return (
    <View>
      <View
        style={{
          flex: 1,
          padding: horizontalScale(16),
          justifyContent: 'center',
          alignItems: 'center',
          height: verticalScale(109),
          borderRadius: horizontalScale(16),
          borderWidth: 1,
          borderColor: Colors.borderColor,
          marginVertical: verticalScale(16),
        }}>
        <TouchableOpacity onPress={chooseFile}>
          <PlusIcon />
        </TouchableOpacity>
      </View>
      <FlatList
        data={selectedImage}
        renderItem={({ item }) => {
          return (
            <View style={{ flex: 1, width: 200, height: 200 }}>
              <Image source={item} style={{ flex: 1, width: 100 }} />
            </View>
          );
        }}
      />
    </View>
  );
};

export default ImageUploadButton;
