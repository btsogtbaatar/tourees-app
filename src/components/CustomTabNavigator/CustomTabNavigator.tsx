import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { default as React } from 'react';
import { Text } from 'react-native';
import { FontWeight, getFontWeight, Typography } from '../../theme';
import { colors } from '../../theme/colors';
import { LogoIcon } from '../Icon';

const Tab = createBottomTabNavigator();

export interface TabNavigationItem {
  route: string;
  component: ({ navigation, route }: any) => JSX.Element;
  label: string;
  activeIcon: React.ReactNode;
  inactiveIcon: React.ReactNode;
  showHeader: boolean;
}

export interface CustomTabNavigatorProps {
  showTabBar?: boolean;
  items: TabNavigationItem[];
}

const CustomTabNavigator = (props: CustomTabNavigatorProps) => {
  const headerTitle = (item: TabNavigationItem) => {
    if (item.route === 'Home') {
      return <LogoIcon />;
    } else {
      return (
        <Text
          style={{
            ...Typography.textRegular,
            ...getFontWeight(FontWeight.bold),
          }}>
          {item.label}
        </Text>
      );
    }
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          display: props.showTabBar === true ? 'flex' : 'none',
        },
        headerShadowVisible: false,
      }}>
      {props.items.map(item => {
        return (
          <Tab.Screen
            key={item.route}
            name={item.route}
            component={item.component}
            options={{
              headerStyle: {
                backgroundColor: colors.silver,
              },
              headerShown: item.showHeader,
              headerTitle: () => headerTitle(item),
              tabBarLabel: item.label,
              tabBarActiveTintColor: colors.primary500,
              tabBarInactiveTintColor: colors.gray400,
              tabBarLabelStyle: { ...Typography.textSmallest },
              tabBarIcon: ({ focused }) =>
                focused ? item.activeIcon : item.inactiveIcon,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};
export default CustomTabNavigator;
