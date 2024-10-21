import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  ImageProps,
  ImageRequireSource,
  ImageURISource,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import {
  selectAuthenticated,
  selectToken,
} from '../../modules/Auth/slice/authSlice';
import { colors } from '../../theme/colors';
import { getImageUrl } from '../../utilities/image';
import { XCircleIcon } from '../Icon';
import ImagePreviewStyle from '../ImageUploadButton/ImagePreview.style';

export interface CustomImageProps extends ImageProps {
  onDelete?: (index: number) => void;
  index?: number;
}

const CustomImage = (props: CustomImageProps) => {
  const uriSource = props.source as ImageURISource;
  const requireSource = props.source as ImageRequireSource;
  const [showPreview, setShowPreview] = useState(false);

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

  if (props.onDelete)
    return (
      <ImageBackground
        style={ImagePreviewStyle.customContainer}
        imageStyle={{ borderRadius: 16 }}
        source={getSource()}>
        <TouchableOpacity
          style={ImagePreviewStyle.delete}
          onPress={() => {
            props.onDelete && props.index && props.onDelete(props.index);
          }}>
          <XCircleIcon color={colors.primary500} />
        </TouchableOpacity>
      </ImageBackground>
    );

  return <Image resizeMode="contain" {...props} source={getSource()} />;
};

export default CustomImage;
