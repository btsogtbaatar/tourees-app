import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import CalendarStyle from './Calendar.style';
import React from 'react';

interface CalendarButtonProps extends TouchableOpacityProps {
  active: boolean;
}

const CalendarButton: React.FC<CalendarButtonProps> = ({
  active,
  style,
  onPress,
  children,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      CalendarStyle.button,
      active ? CalendarStyle.active : CalendarStyle.inActive,
      style,
    ]}>
    {children}
  </TouchableOpacity>
);
export default CalendarButton;
