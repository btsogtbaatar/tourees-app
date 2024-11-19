import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { default as React } from 'react';
import { Text, View } from 'react-native';
import { Typography } from '../../theme';
import { colors } from '../../theme/colors';
import { LogoIcon } from '../Icon';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { CustomTabNavigatorStyle } from './CustomTabNavigator.style';

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
      return (
        <View style={CustomTabNavigatorStyle.header}>
          <View>
            <LogoIcon />
          </View>
          <LanguageSwitcher />
        </View>
      );
    } else {
      return (
        <Text style={CustomTabNavigatorStyle.headerLabel}>{item.label}</Text>
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
                backgroundColor: colors.white,
              },
              headerShown: item.showHeader,
              headerTitle: () => headerTitle(item),
              tabBarLabel: item.label,
              tabBarActiveTintColor: colors.primaryGradient,
              tabBarInactiveTintColor: colors.gray400,
              tabBarLabelStyle: {
                ...Typography.textSmallestColorless,
              },
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
