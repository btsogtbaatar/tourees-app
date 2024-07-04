import React from 'react';
import { Path, Svg, G, SvgProps } from 'react-native-svg';

const FooterBack: React.FC<SvgProps> = props => {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <G id="arrow-narrow-left">
        <Path
          id="Icon"
          d="M16.6673 10H3.33398M3.33398 10L8.33398 15M3.33398 10L8.33398 5"
          stroke={props.color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
    </Svg>
  );
};

export default FooterBack;
