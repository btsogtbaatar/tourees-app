import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, PanResponder, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import CustomSliderStyles from './CustomSlider.style';

const { width } = Dimensions.get('window');

const CustomSlider = ({
  minDistance,
  maxDistance,
  initialDistance,
  step,
  onChange
}) => {
  const { t } = useTranslation();
  const [distance, setDistance] = useState(initialDistance);
  const sliderWidth = width * 0.8;
  const thumbWidth = 20;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return gestureState.dx > 0;
      },
      onPanResponderMove: (evt, gestureState) => {
        const rawDistance = Math.round(
          ((gestureState.moveX - thumbWidth) / (sliderWidth - thumbWidth)) *
            (maxDistance - minDistance) +
            minDistance,
        );

        const newDistance = Math.round(rawDistance / step) * step;

        if (newDistance >= minDistance && newDistance <= maxDistance) {
          setDistance(newDistance);
          if (onChange) {
            onChange(newDistance);
          }
        }
      },
    }),
  ).current;

  return (
    <View style={CustomSliderStyles.container}>
      <Text style={CustomSliderStyles.label}>
        {t('service.distance')}: {distance > 100 ? '100+' : `${distance} км`}
      </Text>
      <View style={CustomSliderStyles.sliderContainer}>
        <View style={[CustomSliderStyles.sliderTrack, { width: sliderWidth }]}>
          <View
            style={[
              CustomSliderStyles.thumb,
              {
                left:
                  ((distance - minDistance) / (maxDistance - minDistance)) *
                  (sliderWidth - thumbWidth),
              },
            ]}
            {...panResponder.panHandlers}
          />
        </View>
      </View>
    </View>
  );
};

CustomSlider.defaultProps = {
  minDistance: 0,
  maxDistance: 101,
  initialDistance: 0,
  step: 5,
};

export default CustomSlider;
