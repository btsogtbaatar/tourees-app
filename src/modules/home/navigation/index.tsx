import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import Badge from '../../../components/Badge/Badge';
import CustomTabNavigator, {
  TabNavigationItem,
} from '../../../components/CustomTabNavigator/CustomTabNavigator';
import {
  BellActiveIcon,
  BellIcon,
  HomeActiveIcon,
  HomeIcon,
  SmileCircleActiveIcon,
  SmileCircleIcon,
  UserActiveIcon,
  UserIcon,
} from '../../../components/Icon';
import { selectAuthenticated } from '../../Auth/slice/authSlice';
import NotificationList from '../../Notification/pages/NotificationList/NotificationList';
import { selectUnreadNotificationCount } from '../../Notification/slice/notificationSlice';
import Profile from '../../Profile/pages/Profile/Profile';
import RequestList from '../../Request/page/RequestList/RequestList';
import Home from '../pages/Home/Home';

const HomeTabNavigator = () => {
  const { t } = useTranslation();
  const isAuthenticated = useSelector(selectAuthenticated);
  const unreadNotificationCount = useSelector(selectUnreadNotificationCount);

  const items: TabNavigationItem[] = [
    {
      route: 'Home',
      label: t('tab.t_home'),
      activeIcon: <HomeActiveIcon />,
      inactiveIcon: <HomeIcon />,
      component: Home,
      showHeader: true,
    },
    {
      route: 'Request',
      label: t('tab.t_request'),
      activeIcon: <SmileCircleActiveIcon />,
      inactiveIcon: <SmileCircleIcon />,
      component: RequestList,
      showHeader: true,
    },
    {
      route: 'Notification',
      label: t('tab.t_notification'),
      activeIcon: (
        <View>
          <BellActiveIcon />
          {unreadNotificationCount > 0 && (
            <Badge text={unreadNotificationCount.toString()} />
          )}
        </View>
      ),
      inactiveIcon: (
        <View>
          <BellIcon />
          {unreadNotificationCount > 0 && (
            <Badge text={unreadNotificationCount.toString()} />
          )}
        </View>
      ),
      component: NotificationList,
      showHeader: false,
    },
    {
      route: 'Profile',
      label: t('tab.t_profile'),
      activeIcon: <UserActiveIcon />,
      inactiveIcon: <UserIcon />,
      component: Profile,
      showHeader: false,
    },
  ];

  return <CustomTabNavigator showTabBar={isAuthenticated} items={items} />;
};

export default HomeTabNavigator;
