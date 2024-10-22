import React, { useRef, useState } from 'react';
import { Dimensions, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { SharedModel } from '../../modules/Shared/entities/shared.model';
import CustomImage from '../CustomImage/CustomImage';
import SliderImagesStyles from './SliderImages.style';
const { width: screenWidth } = Dimensions.get('window');

interface SliderImagesProps {
  images: SharedModel.File[];
}

const SliderImages = (props: SliderImagesProps) => {
  const { images } = props;
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  return (
    <View>
      <Carousel
        ref={carouselRef}
        data={images}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        sliderHeight={200}
        itemHeight={200}
        autoplay={true}
        loop={true}
        lockScrollWhileSnapping={true}
        decelerationRate={0.25}
        inactiveSlideScale={1}
        onSnapToItem={index => setActiveSlide(index)}
        renderItem={({ item }) => {
          return (
            <CustomImage
              source={{ uri: item.url }}
              height={200}
              resizeMode="cover"
            />
          );
        }}
      />
      <Pagination
        activeDotIndex={activeSlide}
        dotsLength={images ? images.length : 1}
        containerStyle={SliderImagesStyles.paginationContainer}
        dotStyle={SliderImagesStyles.dotContainer}
      />
    </View>
  );
};

export default SliderImages;
