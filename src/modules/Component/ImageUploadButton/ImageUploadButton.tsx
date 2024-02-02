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
    <View style={{ flex: 1 }}>
      {selectedImage && selectedImage.length > 0 ? (
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            backgroundColor: 'red',
            // justifyContent: 'space-between',
          }}>
          <FlatList
            data={selectedImage}
            // columnWrapperStyle={{ justifyContent: 'space-around' }}
            numColumns={3}
            // viewabilityConfig={{
            //   itemVisiblePercentThreshold: 100,
            // }}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    marginVertical: verticalScale(16),
                    height: verticalScale(109),
                    flex: 1,
                    marginHorizontal: horizontalScale(8),
                    borderRadius: 16,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                  }}>
                  {selectedImage.length === 1 && (
                    <TouchableOpacity onPress={chooseFile}>
                      <PlusIcon />
                    </TouchableOpacity>
                  )}
                  <Image
                    source={item}
                    style={{
                      flex: 1,
                      height: '100%',
                      width: '100%',
                      borderRadius: 16,
                    }}
                  />
                </View>
              );
            }}
          />
        </View>
      ) : (
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
      )}
    </View>
    // <View
    //   style={{
    //     // flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     // flex: 1,
    //   }}>
    //   <View
    //     style={{
    //       flex: 1,
    //       padding: horizontalScale(16),
    //       justifyContent: 'center',
    //       alignItems: 'center',
    //       height: verticalScale(109),
    //       borderRadius: horizontalScale(16),
    //       borderWidth: 1,
    //       borderColor: Colors.borderColor,
    //       marginVertical: verticalScale(16),
    //       //   width: 109,
    //     }}>
    //     <TouchableOpacity onPress={chooseFile}>
    //       <PlusIcon />
    //     </TouchableOpacity>
    //   </View>
    //   <FlatList
    //     data={selectedImage}
    //     columnWrapperStyle={{ justifyContent: 'space-around' }}
    //     numColumns={2}
    //     // viewabilityConfig={{
    //     //   itemVisiblePercentThreshold: 100,
    //     // }}
    //     renderItem={({ item }) => {
    //       return (
    //         <View
    //           style={{
    //             marginVertical: verticalScale(16),
    //             height: verticalScale(109),
    //             flex: 1,
    //             marginHorizontal: horizontalScale(16),
    //             borderRadius: 16,
    //             backgroundColor: 'red',
    //             // alignItems: 'center',
    //           }}>
    //           <Image source={item} style={{ flex: 1, borderRadius: 16 }} />
    //         </View>
    //       );
    //     }}
    //   />
    // </View>
  );
};

export default ImageUploadButton;
