import React, { useState } from 'react';
import { View } from 'react-native';
import { RegisterStyle } from '../../modules/Auth/pages/Register/Register.style';
import TabItem from '../TabItem/TabItem';

export interface TabControllerProps {
  firstTabLabel: string;
  secondTabLabel: string;
  onSelectedTabChange: (type: number) => void;
}

export default function TabController(props: Readonly<TabControllerProps>) {
  const [tabIndex, setTabIndex] = useState<number>(0);

  return (
    <View style={RegisterStyle.tabContainer}>
      <TabItem
        onSelect={() => {
          if (tabIndex !== 0) {
            setTabIndex(0);
            props.onSelectedTabChange(0);
          }
        }}
        label={props.firstTabLabel}
        selected={tabIndex === 0}
      />
      <View style={{ width: RegisterStyle.container.paddingHorizontal }} />
      <TabItem
        onSelect={() => {
          if (tabIndex !== 1) {
            setTabIndex(1);
            props.onSelectedTabChange(1);
          }
        }}
        label={props.secondTabLabel}
        selected={tabIndex === 1}
      />
    </View>
  );
}
