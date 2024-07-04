import React from 'react';
import { Circle, Svg, SvgProps } from 'react-native-svg';

const StepCircleIcon: React.FC<SvgProps> = props => {
  return (
    <Svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <Circle id="Ellipse 53" cx="6" cy="6" r="6" fill={props.color} />
    </Svg>
  );
};

export default StepCircleIcon;
