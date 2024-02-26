import React from 'react';
import { Path, Svg } from 'react-native-svg';
import { SvgProps } from 'react-native-svg/lib/typescript/ReactNativeSVG';

const LogoMini = (props: SvgProps) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="12"
      viewBox="0 0 14 12"
      fill="none"
      {...props}>
      <Path
        d="M3.5282 6.03895C4.34871 6.12295 6.62573 6.15445 5.52772 8.37747C4.61571 10.2255 5.64022 12 7.44924 12C9.25826 12 10.5978 10.3665 9.58976 8.60547C8.79475 7.21646 9.13975 5.98345 10.6248 5.89495C13.0173 5.75244 13.7073 3.88343 12.8928 2.61592C12.1323 1.43241 10.6863 1.2284 9.26425 2.65792C8.27275 3.65393 7.17174 3.19042 5.93723 1.1309C5.02072 -0.39911 2.6657 -0.307609 1.57069 0.989903C-0.121328 2.99542 1.08018 5.78844 3.5282 6.03895Z"
        fill={props.color ? props.color : 'white'}
      />
    </Svg>
  );
};

export default LogoMini;
