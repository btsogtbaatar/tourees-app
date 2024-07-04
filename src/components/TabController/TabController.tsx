import React, { useState } from 'react';
import { View } from 'react-native';
import TabItem from '../TabItem/TabItem';
import styles from '../../modules/auth/pages/Register/Register.style';

export interface TabControllerProps {
  firstTabLabel: string;
  secondTabLabel: string;
  onSelectedTabChange: (type: number) => void;
}

export default function TabController(props: Readonly<TabControllerProps>) {
  const [tabIndex, setTabIndex] = useState<number>(0);

  return (
    <View style={styles.tabContainer}>
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
      <View style={{ width: styles.container.paddingHorizontal }}></View>
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
