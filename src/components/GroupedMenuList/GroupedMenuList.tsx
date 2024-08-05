import React from 'react';
import { FlatList } from 'react-native';
import GroupedMenuListStyle from './GroupedMenuList.style';
import GroupedMenuItem from './GroupedMenuItem';

export type FilledListProps = {
  onPress: () => void;
  values: string[];
  prefix: React.ReactNode;
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
      renderItem={({ item, index }) => {
        return (
          <GroupedMenuItem
            index={index}
            length={listItems.length}
            onPress={item.onPress}
            values={item.values}
            prefix={item.prefix}
            suffix={item.suffix}
          />
        );
      }}
    />
  );
};

export default GroupedMenuList;
