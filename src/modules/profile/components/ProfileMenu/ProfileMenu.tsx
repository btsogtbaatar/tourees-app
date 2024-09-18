import { useNavigation } from '@react-navigation/native';
import { default as React } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../../../../../i18n';
import GroupedMenuList from '../../../../components/GroupedMenuList/GroupedMenuList';
import {
  ChevronRightIcon,
  ClockRewindIcon,
  EBarimtIcon,
  FileIcon,
  GlobalIcon,
  HelpCircleIcon,
  LogoutIcon,
  UserCircleIcon,
} from '../../../../components/Icon';
import {
  authStore,
  languageStore,
  profileStore,
} from '../../../../context/auth/store';
import { colors } from '../../../../theme/colors';

const ProfileMenu = () => {
  const { t } = useTranslation();
  const authState = authStore((state) => state);
  const languageState = languageStore((state) => state);
  const profileState = profileStore();
  const navigation = useNavigation();
  const profileMenus = [
    {
      values: [t('profile.l_register_infomation')],
      prefix: <UserCircleIcon />,
      suffix: <ChevronRightIcon color={colors.gray700} />,
      onPress: () => {
        navigation.navigate('TaskerStack', { screen: 'RegisterTasker' });
      },
    },
    {
      values: [t('Set up task alerts')],
      prefix: <UserCircleIcon />,
      suffix: <ChevronRightIcon color={colors.gray700} />,
      onPress: () => {
        navigation.navigate('TaskerStack', { screen: 'RegisterTasker' });
      },
    },
    {
      values: [t('profile.l_history')],
      prefix: <ClockRewindIcon />,
      suffix: <ChevronRightIcon color={colors.gray700} />,
      onPress: () => {
        console.log('test');
      },
    },
    {
      values: [t('profile.l_ebarimt')],
      prefix: <EBarimtIcon />,
      suffix: <ChevronRightIcon color={colors.gray700} />,
      onPress: () => {
        console.log('test');
      },
    },

    {
      values: [t('profile.language'), t('profile.mongolia')],
      prefix: <GlobalIcon />,
      suffix: <ChevronRightIcon color={colors.gray700} />,
      onPress: () => {
        const language = languageState.language;
        i18n.changeLanguage(language === 'mn' ? 'en' : 'mn').then(() => {
          languageState.setLanguage(language === 'mn' ? 'en' : 'mn');
        });
      },
    },
    {
      values: [t('profile.t_serviceterm')],
      prefix: <FileIcon />,
      suffix: <ChevronRightIcon color={colors.gray700} />,
      onPress: () => {
        console.log('test');
      },
    },
    {
      values: [t('profile.l_help')],
      prefix: <HelpCircleIcon />,
      suffix: <ChevronRightIcon color={colors.gray700} />,
      onPress: () => {
        console.log('test');
      },
    },
    {
      values: [t('profile.l_logout')],
      prefix: <LogoutIcon />,
      suffix: <ChevronRightIcon color={colors.logoColor} />,
      onPress: () => {
        authState.clearAccessToken();
        profileState.clearPicture();
        navigation.navigate('HomeTab', { screen: 'Home' });
      },
    },
  ];
  return <GroupedMenuList listItems={profileMenus} />;
};

export default ProfileMenu;
