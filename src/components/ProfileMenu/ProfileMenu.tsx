import { useNavigation } from '@react-navigation/native';
import { default as React } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import i18n from '../../../i18n';
import { useAppDispatch } from '../../context/app/store';
import { resetAuth } from '../../modules/Auth/slice/authSlice';
import { changeLanguage, selectLanguage } from '../../modules/Shared/slice/preferenceSlice';
import { colors } from '../../theme';
import GroupedMenuList from '../GroupedMenuList/GroupedMenuList';
import {
  ChevronRightIcon,
  ClockRewindIcon,
  EBarimtIcon,
  FileIcon,
  GlobalIcon,
  HelpCircleIcon,
  LogoutIcon,
  UserCircleIcon,
} from '../Icon';
const ProfileMenu = () => {
  const { t } = useTranslation();
  const language = useSelector(selectLanguage);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const profileMenus = [
    {
      values: [t('profile.l_register_infomation')],
      prefix: <UserCircleIcon />,
      suffix: <ChevronRightIcon color={colors.gray700} />,
      onPress: () => {
        console.log('test');
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
        let selectedLanguage = language === 'mn' ? 'en' : 'mn';
        i18n.changeLanguage(selectedLanguage).then(() => {
          dispatch(changeLanguage(selectedLanguage));
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
      suffix: <ChevronRightIcon color={colors.primary500} />,
      onPress: () => {
        dispatch(resetAuth());
        navigation.navigate('HomeTab', { screen: 'Home' });
      },
    },
  ];
  return <GroupedMenuList listItems={profileMenus} />;
};

export default ProfileMenu;
