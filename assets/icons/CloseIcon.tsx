import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const CloseIcon = (props: SvgProps) => {
  return (
    <Svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M13 1L1 13M1 1l12 12"
        stroke="#0B0B0E"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CloseIcon;
