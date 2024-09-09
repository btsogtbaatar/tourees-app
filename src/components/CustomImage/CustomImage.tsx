import React from 'react';
import {
  Image,
  ImageProps,
  ImageRequireSource,
  ImageURISource,
} from 'react-native';
import { useSelector } from 'react-redux';
import {
  selectAuthenticated,
  selectToken,
} from '../../modules/Auth/slice/authSlice';
import { getImageUrl } from '../../utilities/image';

export interface CustomImageProps extends ImageProps {}

const CustomImage = (props: CustomImageProps) => {
  const uriSource = props.source as ImageURISource;
  const requireSource = props.source as ImageRequireSource;

  const token = useSelector(selectToken);
  const isAuthenticated = useSelector(selectAuthenticated);

  const getSource = () => {
    if (uriSource.uri !== undefined) {
      return {
        headers: isAuthenticated
          ? { Authorization: `Bearer ${token?.jwt}` }
          : undefined,
        uri: getImageUrl(uriSource.uri),
      };
    } else {
      return requireSource;
    }
  };

  return <Image resizeMode="contain" {...props} source={getSource()} />;
};

export default CustomImage;
