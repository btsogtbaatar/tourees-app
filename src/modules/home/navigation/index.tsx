import React from 'react';
import { useTranslation } from 'react-i18next';
import { HomeSmile, SmileCircleActiveIcon } from '../../../assets/svg';
import HomeIconDisabled from '../../../assets/svg/dashboard/HomeIconDisabled';
import SmileCircleIcon from '../../../assets/svg/dashboard/SmileCircleIcon';
import UserIcon from '../../../assets/svg/dashboard/UserIcon';
import UserIconActive from '../../../assets/svg/dashboard/UserIconActive';
import CustomTabNavigator from '../../../components/CustomTabNavigator/CustomTabNavigator';
import { TabNavigationItem } from '../../../components/CustomTabNavigator/TabNavigationItem';
import { authStore } from '../../../context/auth/store';
import Profile from '../../Profile/pages/Profile/Profile';
import RequestList from '../../Request/page/RequestList/RequestList';
import Home from '../pages/Home/Home';

const HomeStack = () => {
  const { t } = useTranslation();
  const isAuth = authStore(state => state);

  const items: TabNavigationItem[] = [
    {
      route: 'Home',
      label: t('tab.t_home'),
      inActiveIcon: <HomeSmile />,
      outActiveIcon: <HomeIconDisabled />,
      component: Home,
      showHeader: true,
    },
    {
      route: 'Request',
      label: t('tab.t_request'),
      inActiveIcon: <SmileCircleActiveIcon />,
      outActiveIcon: <SmileCircleIcon />,
      component: RequestList,
      showHeader: true,
    },
    {
      route: 'Profile',
      label: t('tab.t_profile'),
      inActiveIcon: <UserIconActive />,
      outActiveIcon: <UserIcon />,
      component: Profile,
      showHeader: false,
    },
  ];

  if (isAuth.authenticated) {
    return <CustomTabNavigator items={items} />;
  } else {
    return <Home />;
  }
};

export default HomeStack;
