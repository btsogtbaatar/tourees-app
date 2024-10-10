import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import CustomTabNavigator, {
  TabNavigationItem,
} from '../../../components/CustomTabNavigator/CustomTabNavigator';
import {
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
import Profile from '../../Profile/pages/Profile/Profile';
import TaskList from '../../Request/page/TaskList/TaskList';
import Home from '../pages/Home/Home';

const HomeTabNavigator = () => {
  const { t } = useTranslation();
  const isAuthenticated = useSelector(selectAuthenticated);

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
