import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import GroupedMenuItemStyle from './GroupedMenuItem.style';
import { colors } from '../../theme';

export type FilledListProps = {
  onPress: () => void;
  values: string[];
  prefix: React.ReactNode;
  suffix: React.ReactNode;
  index: number;
  length: number;
};

const GroupedMenuItem: React.FC<FilledListProps> = ({
  onPress,
  prefix,
  index,
  values,
  suffix,
  length,
}) => {
  return (
    <TouchableOpacity style={GroupedMenuItemStyle.container} onPress={onPress}>
      <View style={GroupedMenuItemStyle.subContainer}>
        {prefix}
        <View style={GroupedMenuItemStyle.menu}>
          <Text
            style={[
              GroupedMenuItemStyle.menuName,
              index === length - 1 && {
                color: colors.logoColor,
              },
            ]}>
            {values[0]}
          </Text>
        </View>
        {values[1] && (
          <Text style={GroupedMenuItemStyle.subMenu}>{values[1]}</Text>
        )}
      </View>
      {suffix}
    </TouchableOpacity>
  );
};
export default GroupedMenuItem;
