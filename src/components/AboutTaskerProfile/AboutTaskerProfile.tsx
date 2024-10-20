import React from 'react';
import { View, Text } from 'react-native';
import CustomImage from '../CustomImage/CustomImage';
import { RemarkTextViewStyle } from '../RemarkTextView/RemarkTextView.style';
import AboutTaskerProfileStyle from './AboutTaskerProfile.style';
import { useTranslation } from 'react-i18next';

interface AboutTaskerProfileProps {
  imageUrl?: string;
  name: string;
}

const AboutTaskerProfile = (props: AboutTaskerProfileProps) => {
  const { name, imageUrl } = props;
  const { t } = useTranslation();
  return (
    <View>
      <Text style={RemarkTextViewStyle.label}>About this tasker</Text>
      <View style={AboutTaskerProfileStyle.titleContainer}>
        <View>
          <Text style={AboutTaskerProfileStyle.nameStyle}>{name}</Text>
          <Text style={AboutTaskerProfileStyle.statusStyle}>
            {t('service.status.new')}
          </Text>
        </View>
        <CustomImage
          source={{ uri: imageUrl }}
          height={60}
          width={60}
          resizeMode="cover"
          style={{ borderRadius: 35 }}
        />
      </View>
    </View>
  );
};

export default AboutTaskerProfile;
