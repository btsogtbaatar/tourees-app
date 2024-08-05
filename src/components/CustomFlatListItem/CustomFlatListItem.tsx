import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../theme';
import CustomImage from '../CustomImage/CustomImage';
import { ChevronRightIcon } from '../Icon';
import { CustomFlatListItemStyles } from './CustomFlatListItem.style';

export interface CustomFlatListItemProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  onPress: () => void;
}

function CustomFlatListItem(props: Readonly<CustomFlatListItemProps>) {
  return (
    <TouchableOpacity
      style={CustomFlatListItemStyles.container}
      onPress={props.onPress}>
      <View style={CustomFlatListItemStyles.subContainer}>
        <CustomImage
          style={CustomFlatListItemStyles.image}
          width={52}
          height={52}
          source={{
            uri: props.imageUrl,
          }}
        />
        <View style={CustomFlatListItemStyles.titleContainer}>
          <Text style={CustomFlatListItemStyles.title}>{props.title}</Text>
          <Text
            style={CustomFlatListItemStyles.subtitle}
            numberOfLines={1}
            ellipsizeMode="tail">
            {props.subtitle}
          </Text>
        </View>
      </View>
      <ChevronRightIcon color={colors.gray700} />
    </TouchableOpacity>
  );
}

export default CustomFlatListItem;
