import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Colors } from '../../../constants/Colors';
import { HomeSmile, LogoIcon, SmileCircleActiveIcon } from '../../assets/svg';
import HomeIconDisabled from '../../assets/svg/dashboard/HomeIconDisabled';
import SmileCircleIcon from '../../assets/svg/dashboard/SmileCircleIcon';
import UserIcon from '../../assets/svg/dashboard/UserIcon';
import UserIconActive from '../../assets/svg/dashboard/UserIconActive';
import { authStore } from '../../context/auth/store';
import { MenuModule } from '../../context/entities';
import { DashboardStackParamList } from '../../types/DashboardStackParamList';
import HeaderComponent from '../Component/HeaderBack/HeaderComponent';
import LoginButton from '../Component/LoginButton/LoginButton';
import Dashboard from './Pages/Home/Dashboard/Dashboard';
import Profile from './Pages/Home/Profile/Profile';
import Request from './Pages/Home/Request/Request';
import { TabBarIndexCommon } from '../../uitls/tabBarCommon';
import HeaderBar from '../Component/HeaderBack/HeaderBar';

const TabArr: MenuModule.TabModule[] = [
  {
    route: 'Home',
    label: 't_home',
    inActiveIcon: <HomeSmile />,
    outActiveIcon: <HomeIconDisabled />,
    component: Dashboard,
  },
  {
    route: 'Request',
    label: 't_request',
    inActiveIcon: <SmileCircleActiveIcon />,
    outActiveIcon: <SmileCircleIcon />,
    component: Request,
  },
  {
    route: 'Profile',
    label: 't_profile',
    inActiveIcon: <UserIconActive />,
    outActiveIcon: <UserIcon />,
    component: Profile,
  },
];
const Tab = createBottomTabNavigator<DashboardStackParamList>();
const Stack = createNativeStackNavigator<DashboardStackParamList>();

const DashboardStack = () => {
  const authState = authStore(state => state);
  const { t } = useTranslation();
  const { tabBarMenus } = TabBarIndexCommon();
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {},
        }}>
        {tabBarMenus.map((item, index) => {
          return (
            <Tab.Screen
              key={index}
              name={item.route}
              component={item.component}
              options={{
                headerShown: item.route !== 'Profile',
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
                tabBarActiveTintColor: Colors.primaryColor,
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
                  return (
                    <>{focused ? item.inActiveIcon : item.outActiveIcon}</>
                  );
                },
              }}
            />
          );
        })}
      </Tab.Navigator>
    </>
  );
};

const DashboardMainStack = () => {
  const isAuth = authStore(state => state);
  return (
    <>
      {isAuth.authenticated ? (
        <DashboardStack />
      ) : (
        <Stack.Navigator>
          <Stack.Group>
            <Stack.Screen
              name="Home"
              component={Dashboard}
              options={{
                header: () => <HeaderBar isDashboard={true} />,
              }}
            />
          </Stack.Group>
        </Stack.Navigator>
      )}
    </>
  );
};

export default DashboardMainStack;
