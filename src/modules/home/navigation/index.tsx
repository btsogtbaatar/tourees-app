import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomTabNavigator, {
  TabNavigationItem,
} from '../../../components/CustomTabNavigator/CustomTabNavigator';
import {
  HomeActiveIcon,
  HomeIcon,
  SmileCircleActiveIcon,
  SmileCircleIcon,
  UserActiveIcon,
  UserIcon,
} from '../../../components/Icon';
import { authStore } from '../../../context/auth/store';
import Profile from '../../Profile/pages/Profile/Profile';
import RequestList from '../../Request/page/RequestList/RequestList';
import Home from '../pages/Home/Home';

const HomeTabNavigator = () => {
  const { t } = useTranslation();
  const isLoggedIn = authStore(state => state.authenticated);

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
      route: 'Profile',
      label: t('tab.t_profile'),
      activeIcon: <UserActiveIcon />,
      inactiveIcon: <UserIcon />,
      component: Profile,
      showHeader: false,
    },
  ];

  return <CustomTabNavigator tabBarShown={isLoggedIn} items={items} />;
};

export default HomeTabNavigator;
