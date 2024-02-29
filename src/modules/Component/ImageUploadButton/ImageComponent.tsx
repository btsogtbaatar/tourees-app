import React from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './ImageComponent.style';
import { PlusIcon } from '../../../assets/svg';
import { ImageSourse } from './ImageUploadButton';

interface ImageComponentProps {
  item: ImageSourse;
  index: number;
  chooseFile: () => void;
  selectedImage: number;
}

const ImageComponent = ({
  item,
  index,
  chooseFile,
  selectedImage,
}: ImageComponentProps) => {
  const imageSize = () => {
    return selectedImage - 5;
  };
  return (
    <>
      {index < 5 ? (
        <View style={styles.container}>
          {index === 0 ? (
            <TouchableOpacity onPress={chooseFile}>
              <PlusIcon />
            </TouchableOpacity>
          ) : (
            <Image style={styles.imageContainer} source={item} />
          )}
        </View>
      ) : index === 5 ? (
        <View style={styles.container}>
          <ImageBackground
            style={styles.imageBackContainer}
            imageStyle={styles.br16}
            resizeMode="stretch"
            source={item}
            blurRadius={10}>
            <Text style={styles.imageTitle}>+{imageSize()}</Text>
          </ImageBackground>
        </View>
      ) : null}
    </>
  );
};

export default ImageComponent;