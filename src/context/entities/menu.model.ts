import { Component, ReactElement } from 'react';

export declare module MenuModule {
  export type TabModule = {
    route: string;
    label: string;
    inActiveIcon: ReactElement;
    outActiveIcon: ReactElement;
    component: (navigation: any) => React.JSX.Element;
  };
}
