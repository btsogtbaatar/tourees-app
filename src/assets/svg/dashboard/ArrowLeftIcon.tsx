import React from 'react';
import { G, Path, Svg, SvgProps } from 'react-native-svg';

const ArrowLeftIcon: React.FC<SvgProps> = props => {
  return (
    <Svg width="20" height="21" viewBox="0 0 20 21" fill="none">
      <G id="arrow-left">
        <Path
          id="Solid"
          d="M10.5899 5.05931C10.9153 4.73387 10.9153 4.20623 10.5899 3.8808C10.2645 3.55536 9.73683 3.55536 9.4114 3.8808L3.57806 9.71413C3.25263 10.0396 3.25263 10.5672 3.57806 10.8926L9.4114 16.726C9.73683 17.0514 10.2645 17.0514 10.5899 16.726C10.9153 16.4005 10.9153 15.8729 10.5899 15.5475L6.17916 11.1367L15.834 11.1367C16.2942 11.1367 16.6673 10.7636 16.6673 10.3034C16.6673 9.84315 16.2942 9.47005 15.834 9.47005L6.17916 9.47005L10.5899 5.05931Z"
          fill={props.color ? props.color : '#0B0B0E'}
        />
      </G>
    </Svg>
  );
};

export default ArrowLeftIcon;
