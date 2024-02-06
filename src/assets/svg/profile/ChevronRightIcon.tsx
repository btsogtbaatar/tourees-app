import React from 'react';
import { G, Path, Svg } from 'react-native-svg';
import { SvgProps } from '../PhoneIcon';

const ChevronRightIcon: React.FC<SvgProps> = props => {
  return (
    <Svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <G id="chevron-right">
        <Path
          id="Icon"
          d="M7.5 15L12.5 10L7.5 5"
          stroke={props.color ? props.color : '#21272D'}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
    </Svg>
  );
};

export default ChevronRightIcon;
