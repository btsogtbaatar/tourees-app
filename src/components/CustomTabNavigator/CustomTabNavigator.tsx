import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { default as React } from 'react';
import { useTranslation } from 'react-i18next';
import { colors } from '../../constants/colors';
import { authStore } from '../../context/auth/store';
import HeaderComponent from '../HeaderBack/HeaderComponent';
import { TabNavigationItem } from './TabNavigationItem';

const Tab = createBottomTabNavigator();

export interface CustomTabNavigatorProps {
  items: TabNavigationItem[];
}

const CustomTabNavigator = (props: CustomTabNavigatorProps) => {
  const { t } = useTranslation();
  const authState = authStore(state => state);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {},
      }}>
      {props.items.map((item, index) => {
        return (
          <Tab.Screen
            key={item.route}
            name={item.route}
            component={item.component}
            options={{
              headerShown: item.showHeader,
              headerStyle: {
                backgroundColor: 'transparent',
              },
              headerTitle: () => (
                <HeaderComponent
                  index={index}
                  isAuth={authState.authenticated}
                  title={item.label}
                />
              ),
              headerTitleAlign: 'center',
              tabBarLabel: t(item.label),
              tabBarActiveTintColor: colors.primaryColor,
              tabBarInactiveTintColor: '#5F676F',
              tabBarLabelStyle: {
                fontSize: 10,
                fontWeight: '600',
              },
              tabBarIconStyle: {
                justifyContent: 'center',
                alignItems: 'center',
              },
              tabBarIcon: ({ focused }) => {
                return <>{focused ? item.inActiveIcon : item.outActiveIcon}</>;
              },
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};
export default CustomTabNavigator;
