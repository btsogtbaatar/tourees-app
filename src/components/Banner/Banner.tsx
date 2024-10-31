import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../theme';
import { ChevronRightIcon } from '../Icon';
import BannerStyle from './Banner.style';

interface BannerProps {
  title: string;
  onPress: () => void;
  gradientColors?: string[];
}

const Banner = (props: BannerProps) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <LinearGradient
        colors={props.gradientColors ?? [colors.gray500, colors.dark700]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 1]}
        style={BannerStyle.container}>
        <Text style={BannerStyle.title}>{props.title}</Text>
        <ChevronRightIcon height={20} color={colors.white} />
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Banner;
