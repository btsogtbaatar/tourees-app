import { useTranslation } from 'react-i18next';
import { HomeSmile, SmileCircleActiveIcon } from '../assets/svg';
import HomeIconDisabled from '../assets/svg/dashboard/HomeIconDisabled';
import SmileCircleIcon from '../assets/svg/dashboard/SmileCircleIcon';
import UserIcon from '../assets/svg/dashboard/UserIcon';
import UserIconActive from '../assets/svg/dashboard/UserIconActive';
import Dashboard from '../modules/Dashboard/Pages/Home/Dashboard/Dashboard';
import Profile from '../modules/Dashboard/Pages/Home/Profile/Profile';
import Request from '../modules/Dashboard/Pages/Home/Request/Request';

export const TabBarIndexCommon = () => {
  const { t } = useTranslation();

  const tabBarMenus = [
    {
      route: 'Home',
      label: t('tab.t_home'),
      inActiveIcon: <HomeSmile />,
      outActiveIcon: <HomeIconDisabled />,
      component: Dashboard,
    },
    {
      route: 'Request',
      label: t('tab.t_request'),
      inActiveIcon: <SmileCircleActiveIcon />,
      outActiveIcon: <SmileCircleIcon />,
      component: Request,
    },
    {
      route: 'Profile',
      label: t('tab.t_profile'),
      inActiveIcon: <UserIconActive />,
      outActiveIcon: <UserIcon />,
      component: Profile,
    },
  ];

  return { tabBarMenus };
};
