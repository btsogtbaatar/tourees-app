import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const PlusIcon = (props: SvgProps) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={45}
      height={45}
      viewBox="0 0 45 45"
      fill="none"
      {...props}
    >
      <Path
        d="M24.334 9.667a1.833 1.833 0 10-3.667 0v11h-11a1.833 1.833 0 000 3.667h11v11a1.833 1.833 0 003.667 0v-11h11a1.833 1.833 0 000-3.667h-11v-11z"
        fill="#FF9646"
      />
    </Svg>
  );
};

export default PlusIcon;
