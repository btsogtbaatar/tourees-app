import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import CustomSelectionStyle from './CustomSelection.style';

interface CustomSelection extends TouchableOpacityProps {
  active: boolean;
}

const CustomSelection: React.FC<CustomSelection> = ({
  active,
  style,
  onPress,
  children,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      CustomSelectionStyle.button,
      active ? CustomSelectionStyle.active : CustomSelectionStyle.inActive,
      style,
    ]}>
    {children}
  </TouchableOpacity>
);
export default CustomSelection;
