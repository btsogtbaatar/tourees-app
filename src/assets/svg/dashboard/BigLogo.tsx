import React from 'react';
import { View } from 'react-native';
import { Defs, LinearGradient, Path, Stop, Svg } from 'react-native-svg';
import { horizontalScale, verticalScale } from '../../../uitls/metrics';

const BigLogo = () => {
  return (
    <View
      style={{
        width: horizontalScale(150.462),
        height: verticalScale(145),
        transform: [{ rotate: '-70.576deg' }],
        right: -48,
        bottom: -30,
        position: 'absolute',
      }}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="129"
        height="116"
        viewBox="0 0 129 116"
        fill="none">
        <Path
          d="M70.1492 110.483C74.4138 101.467 83.9384 75.6201 104.855 97.0705C122.27 114.909 146.638 110.364 153.914 89.7281C161.191 69.0926 147.939 47.2463 123.789 51.652C104.744 55.12 92.0529 46.2492 97.0259 28.9325C105.015 1.07868 86.4754 -14.3219 68.7424 -10.1273C52.193 -6.21183 44.0397 9.45504 54.6154 31.4382C61.9906 46.7686 52.2925 57.4473 23.8134 63.2565C2.71372 67.5609 -5.73316 94.797 4.65946 112.512C20.7426 139.872 57.451 137.397 70.1492 110.483Z"
          fill="url(#paint0_linear_8026_2576)"
        />
        <Defs>
          <LinearGradient
            id="paint0_linear_8026_2576"
            x1="58.6441"
            y1="141.663"
            x2="108.682"
            y2="-0.234434"
            gradientUnits="userSpaceOnUse">
            <Stop stop-color="#FF9646" />
            <Stop offset="1" stop-color="#FA6432" />
          </LinearGradient>
        </Defs>
      </Svg>
    </View>
  );
};

export default BigLogo;
