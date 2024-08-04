import LottieView from 'lottie-react-native';
import React from 'react';
import { View } from 'react-native';
import LoadingStyle from './Loading.style';

const Loading = () => {
  return (
    <View style={LoadingStyle.container}>
      <LottieView
        source={require('../../../assets/animations/spinner.json')}
        autoPlay
        loop
        style={LoadingStyle.lottie}
      />
    </View>
  );
};

export default Loading;
