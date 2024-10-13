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
  SearchMdIcon,
  SmileCircleActiveIcon,
  SmileCircleIcon,
  UserActiveIcon,
  UserIcon,
} from '../../../components/Icon';
import { colors } from '../../../theme';
import { selectAuthenticated } from '../../Auth/slice/authSlice';
import NotificationList from '../../Notification/pages/NotificationList/NotificationList';
import { selectUnreadNotificationCount } from '../../Notification/slice/notificationSlice';
import Profile from '../../Profile/pages/Profile/Profile';
import TaskList from '../../Request/page/TaskList/TaskList';
import Home from '../pages/Home/Home';

const HomeTabNavigator = () => {
  const { t } = useTranslation();
  const isAuthenticated = useSelector(selectAuthenticated);
  const unreadNotificationCount = useSelector(selectUnreadNotificationCount);

  const items: TabNavigationItem[] = [
    {
      route: 'Home',
      label: t('tab.tabHome'),
      activeIcon: <HomeActiveIcon />,
      inactiveIcon: <HomeIcon />,
      component: Home,
      showHeader: true,
    },
    {
      route: 'MyTasks',
      label: t('tab.tabMyTasks'),
      activeIcon: <SmileCircleActiveIcon />,
      inactiveIcon: <SmileCircleIcon />,
      component: TaskList,
      showHeader: true,
    },
    {
      route: 'BrowseTasks',
      label: t('tab.tabBrowseTasks'),
      activeIcon: <SearchMdIcon color={colors.primaryGradient} />,
      inactiveIcon: <SearchMdIcon color={colors.gray300} />,
      component: TaskList,
      showHeader: true,
    },
    {
      route: 'Notification',
      label: t('tab.tabNotification'),
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
      label: t('tab.tabProfile'),
      activeIcon: <UserActiveIcon />,
      inactiveIcon: <UserIcon color={colors.gray300} />,
      component: Profile,
      showHeader: false,
    },
  ];

  return <CustomTabNavigator showTabBar={isAuthenticated} items={items} />;
};

export default HomeTabNavigator;
