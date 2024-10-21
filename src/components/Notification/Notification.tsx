import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomImage from '../CustomImage/CustomImage';
import { NotificationStyle } from './Notification.style';

export interface NotificationProps {
  image?: string;
  title: string;
  subTitle: string;
  body: string;
  isRead: boolean;
  onPress: () => void;
}

const Notification = (props: NotificationProps) => {
  return (
    <TouchableOpacity
      style={NotificationStyle.container}
      onPress={props.onPress}>
      <CustomImage
        style={NotificationStyle.image}
        source={
          props.image
            ? {
                uri: props.image,
              }
            : require('../../../assets/images/icon-placeholder.png')
        }
      />
      <View style={NotificationStyle.textContainer}>
        <Text style={NotificationStyle.title}>{props.title}</Text>
        <Text style={NotificationStyle.description}>{props.body}</Text>
        <Text style={NotificationStyle.subtitle}>{props.subTitle}</Text>
      </View>
      {props.isRead === false && <View style={NotificationStyle.circle}></View>}
    </TouchableOpacity>
  );
};

export default Notification;
