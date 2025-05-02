import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, PanResponder, Text, View } from 'react-native';
import CustomSliderStyles from './CustomSlider.style';

const { width } = Dimensions.get('window');

const CustomSlider = ({
  minDistance,
  maxDistance,
  initialDistance,
  step,
  onChange,
}) => {
  const { t } = useTranslation();
  const [distance, setDistance] = useState(initialDistance);
  const sliderWidth = width * 0.8;
  const thumbWidth = 25;
  const displayThreshold = 100; // Value after which we display "100+"

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return gestureState.dx > 0;
      },
      onPanResponderMove: (evt, gestureState) => {
        const moveXPosition = gestureState.moveX - thumbWidth / 2;
        const boundedMoveX = Math.max(
          0,
          Math.min(moveXPosition, sliderWidth - thumbWidth),
        );

        const rawDistance = Math.round(
          (boundedMoveX / (sliderWidth - thumbWidth)) *
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
        {t('service.distance')}:{' '}
        {distance >= displayThreshold
          ? '100+'
          : `${distance} ${t('km')}`}
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
  maxDistance: 110,
  initialDistance: 0,
  step: 5,
};

export default CustomSlider;
