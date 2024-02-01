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
import { DashboardStackParamList } from '../../types/DashboardStackParamList';
import HeaderComponent from '../Component/HeaderBack/HeaderComponent';
import LoginButton from '../Component/LoginButton/LoginButton';
import Dashboard from './Pages/Home/Dashboard/Dashboard';
import Profile from './Pages/Home/Profile/Profile';
import Request from './Pages/Home/Request/Request';

const TabArr = [
  {
    route: 'Home',
    label: 'Нүүр',
    inActiveIcon: <HomeSmile />,
    outActiveIcon: <HomeIconDisabled />,
    component: Dashboard,
  },
  {
    route: 'Request',
    label: 'Хүсэлтүүд',
    inActiveIcon: <SmileCircleActiveIcon />,
    outActiveIcon: <SmileCircleIcon />,
    component: Request,
  },
  {
    route: 'Profile',
    label: 'Миний',
    inActiveIcon: <UserIconActive />,
    outActiveIcon: <UserIcon />,
    component: Profile,
  },
  // { route: 'Search', label: 'Search',   inActiveIcon: 'timeline-plus-outline', component: ColorScreen },
  // { route: 'Account', label: 'Account',  inActiveIcon: 'user-circle-o', component: ColorScreen },
];

type Props = BottomTabBarButtonProps & { item: any };

const Tab = createBottomTabNavigator<DashboardStackParamList>();
const Stack = createNativeStackNavigator<DashboardStackParamList>();

const TabButtons = (props: Props) => {
  const { onPress, accessibilityState, item } = props;
  const focused = accessibilityState?.selected;
  const viewRef = useRef<Animatable.View & View>(null);
  // useEffect(() => {
  //   if (focused) {
  //     viewRef.current &&
  //       typeof viewRef.current.animate({
  //         0: { scale: 0.5, rotate: '0deg' },
  //         1: { scale: 1.5, rotate: '360deg' },
  //       });

  //     // viewRef.current.animate({0: {scale: .5, rotate: '0deg'}, 1: {scale: 1.5, rotate: '360deg'}});
  //   } else {
  //     viewRef.current &&
  //       typeof viewRef.current.animate({
  //         0: { scale: 1.5, rotate: '360deg' },
  //         1: { scale: 1, rotate: '0deg' },
  //       });
  //   }
  // }, [focused]);

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
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            // height: verticalScale(60),
          },
        }}>
        {TabArr.map((item, index) => {
          return (
            <Tab.Screen
              key={index}
              name={item.route}
              component={item.component}
              options={({ route }: any) => {
                return {
                  headerStyle: {
                    backgroundColor: 'transparent',
                  },
                  headerTitle: props => (
                    <HeaderComponent
                      index={index}
                      isAuth={false}
                      title={item.label}
                    />
                  ),
                  tabBarLabel: item.label,
                  tabBarActiveTintColor: Colors.primaryColor,
                  tabBarInactiveTintColor: '#5F676F',
                  tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: '600',
                  },
                  tabBarIconStyle: {
                    // marginTop: verticalScale(20),
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                  tabBarIcon: ({ color, focused }) => {
                    // {focused ? item.inActiveIcon : item.outActiveIcon}
                    return (
                      <>{focused ? item.inActiveIcon : item.outActiveIcon}</>
                    );
                  },
                  // tabBarButton: props => <TabButtons {...props} item={item} />,
                };
              }}
            />
          );
        })}
      </Tab.Navigator>
    </>
  );
};

const DashboardMainStack = () => {
  const isAuth = false;

  return (
    <>
      {isAuth ? (
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
                headerTitle: ''
              }}
            />
          </Stack.Group>
        </Stack.Navigator>
      )}
    </>
  );
};

export default DashboardMainStack;
