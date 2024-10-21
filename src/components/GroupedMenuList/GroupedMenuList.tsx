import React from 'react';
import { FlatList } from 'react-native';
import GroupedMenuItem from './GroupedMenuItem';
import GroupedMenuListStyle from './GroupedMenuList.style';

export type FilledListProps = {
  onPress: () => void;
  values: string[];
  prefix: React.ReactNode;
  color?: string;
  suffix: React.ReactNode;
};
export type GroupedMenuListProps = {
  listItems: Array<FilledListProps>;
};

const GroupedMenuList: React.FC<GroupedMenuListProps> = ({ listItems }) => {
  return (
    <FlatList
      data={listItems}
      contentContainerStyle={GroupedMenuListStyle.container}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => {
        return (
          <GroupedMenuItem
            onPress={item.onPress}
            values={item.values}
            prefix={item.prefix}
            suffix={item.suffix}
            color={item.color}
          />
        );
      }}
    />
  );
};

export default GroupedMenuList;
