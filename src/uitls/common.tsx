import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Colors } from '../../constants/Colors';
import ChevronRightIcon from '../assets/svg/profile/ChevronRightIcon';
import ClockRewindIcon from '../assets/svg/profile/ClockRewindIcon';
import EBarimtIcon from '../assets/svg/profile/EBarimtIcon';
import FileIcon from '../assets/svg/profile/FileIcon';
import HelpCircleIcon from '../assets/svg/profile/HelpCircleIcon';
import LogoutIcon from '../assets/svg/profile/LogoutIcon';
import UserCircleIcon from '../assets/svg/profile/UserCircleIcon';
import { authStore } from '../context/auth/store';
import { MainStackParamList } from '../types/MainStackParamList';

export const ProfileIndexCommon = () => {
  const { t } = useTranslation();
  const authState = authStore(state => state);
  const navigation = useNavigation<MainStackParamList>();
  const profileMenus = [
    {
      values: [t('l_register_infomation')],
      prefix: <UserCircleIcon />,
      suffix: <ChevronRightIcon color={Colors.textHeader} />,
      onPress: () => {
        console.log('test');
      },
    },
    {
      values: [t('l_history')],
      prefix: <ClockRewindIcon />,
      suffix: <ChevronRightIcon color={Colors.textHeader} />,
      onPress: () => {
        console.log('test');
      },
    },
    {
      values: [t('l_ebarimt')],
      prefix: <EBarimtIcon />,
      suffix: <ChevronRightIcon color={Colors.textHeader} />,
      onPress: () => {
        console.log('test');
      },
    },
    {
      values: [t('t_serviceterm')],
      prefix: <FileIcon />,
      suffix: <ChevronRightIcon color={Colors.textHeader} />,
      onPress: () => {
        console.log('test');
      },
    },
    {
      values: [t('l_help')],
      prefix: <HelpCircleIcon />,
      suffix: <ChevronRightIcon color={Colors.textHeader} />,
      onPress: () => {
        console.log('test');
      },
    },
    {
      values: [t('l_logout')],
      prefix: <LogoutIcon />,
      suffix: <ChevronRightIcon color={Colors.logoColor} />,
      onPress: () => {
        authState.clearAccessToken();
        navigation.navigate('DashboardStack');
      },
    },
  ];
  return { profileMenus };
};
