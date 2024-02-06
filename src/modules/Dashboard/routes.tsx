import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useRef } from 'react';
import { TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Colors } from '../../../constants/Colors';
import { HomeSmile, LogoIcon, SmileCircleActiveIcon } from '../../assets/svg';
import HomeIconDisabled from '../../assets/svg/dashboard/HomeIconDisabled';
import SmileCircleIcon from '../../assets/svg/dashboard/SmileCircleIcon';
import UserIcon from '../../assets/svg/dashboard/UserIcon';
import UserIconActive from '../../assets/svg/dashboard/UserIconActive';
import { authStore } from '../../context/auth/store';
import { DashboardStackParamList } from '../../types/DashboardStackParamList';
import HeaderComponent from '../Component/HeaderBack/HeaderComponent';
import LoginButton from '../Component/LoginButton/LoginButton';
import Dashboard from './Pages/Home/Dashboard/Dashboard';
import Profile from './Pages/Home/Profile/Profile';
import Request from './Pages/Home/Request/Request';
import { MenuModule } from '../../context/entities';
import { useTranslation } from 'react-i18next';
import HeaderProfile from '../Component/HeaderBack/HeaderProfile';
import LinearGradient from 'react-native-linear-gradient';

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

type Props = BottomTabBarButtonProps & { item: any };

const Tab = createBottomTabNavigator<DashboardStackParamList>();
const Stack = createNativeStackNavigator<DashboardStackParamList>();

const TabButtons = (props: Props) => {
  const { onPress, accessibilityState, item } = props;
  const focused = accessibilityState?.selected;
  const viewRef = useRef<Animatable.View & View>(null);
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animatable.View ref={viewRef}>
        {focused ? item.inActiveIcon : item.outActiveIcon}
      </Animatable.View>
    </TouchableOpacity>
  );
};

const DashboardStack = () => {
  const authState = authStore(state => state);
  const { t } = useTranslation();
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {},
        }}>
        {TabArr.map((item, index) => {
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
                headerStyle: {
                  backgroundColor: 'transparent',
                },
                headerRight: () => {
                  return <LoginButton />;
                },
                headerLeft: () => {
                  return <LogoIcon />;
                },
                headerTitle: '',
              }}
            />
          </Stack.Group>
        </Stack.Navigator>
      )}
    </>
  );
};

export default DashboardMainStack;
