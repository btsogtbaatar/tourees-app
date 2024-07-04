import React from 'react';

export interface TabNavigationItem {
  route: string;
  component: ({ navigation, route }: any) => JSX.Element;
  label: string;
  inActiveIcon: React.ReactNode;
  outActiveIcon: React.ReactNode;
  showHeader: boolean;
}
