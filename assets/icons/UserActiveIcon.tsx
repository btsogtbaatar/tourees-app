import React from 'react';
import Svg, { G, Path, SvgProps } from 'react-native-svg';

const UserActiveIcon = (props: SvgProps) => {
  return (
    <Svg width={24} height={25} viewBox="0 0 24 25" fill="none" {...props}>
      <G fillRule="evenodd" clipRule="evenodd" fill="#FF9646">
        <Path d="M3.418 18.803C5.391 16.192 8.498 14.5 12 14.5c3.501 0 6.609 1.692 8.582 4.303l.027.036c.17.224.351.465.481.697.157.28.274.605.267 1a2.022 2.022 0 01-.22.85c-.116.235-.295.491-.545.687-.333.262-.696.355-1.019.393a8.472 8.472 0 01-.955.034H5.382c-.337 0-.673 0-.956-.034-.322-.038-.685-.131-1.018-.393a2.023 2.023 0 01-.546-.687 2.022 2.022 0 01-.22-.85 1.93 1.93 0 01.268-1c.13-.233.311-.473.481-.697l.027-.036zM6.5 8a5.5 5.5 0 1111 0 5.5 5.5 0 01-11 0z" />
      </G>
    </Svg>
  );
};

export default UserActiveIcon;
