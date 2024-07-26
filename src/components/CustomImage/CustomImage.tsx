import React from 'react';
import {
  Image,
  ImageProps,
  ImageRequireSource,
  ImageURISource,
} from 'react-native';
import { authStore } from '../../context/auth/store';
import { getImageUrl } from '../../utilities/image';

export interface CustomImageProps extends ImageProps {}

const CustomImage = (props: CustomImageProps) => {
  const uriSource = props.source as ImageURISource;
  const requireSource = props.source as ImageRequireSource;

  const authState = authStore(state => state.auth);

  const getSource = () => {
    if (uriSource.uri !== undefined) {
      return {
        headers: { Authorization: `Bearer ${authState?.token}` },
        uri: getImageUrl(uriSource.uri),
      };
    } else {
      return requireSource;
    }
  };

  return <Image resizeMode="contain" {...props} source={getSource()} />;
};

export default CustomImage;
