import LottieView from 'lottie-react-native';
import React from 'react';
import { View } from 'react-native';

const LoadingPage = () => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <LottieView
        source={require('../../assets/svg/Animation.json')}
        autoPlay
        loop
        style={{ width: 150, height: 150 }}
      />
    </View>
  );
};

export default LoadingPage;
