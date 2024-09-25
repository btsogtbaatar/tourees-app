import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const HeaderEditIcon = (props: SvgProps) => {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M18 10l-4-4M2.5 21.5l3.384-.376c.414-.046.62-.069.814-.131a2 2 0 00.485-.234c.17-.111.317-.259.61-.553L21 7a2.828 2.828 0 10-4-4L3.794 16.206c-.294.294-.442.442-.553.611a2 2 0 00-.233.485c-.063.193-.086.4-.132.814L2.5 21.5z"
        stroke="#0B0B0E"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default HeaderEditIcon;
