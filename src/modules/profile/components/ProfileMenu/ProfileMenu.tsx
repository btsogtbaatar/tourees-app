import { useNavigation } from '@react-navigation/native';
import { default as React } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
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
  PassportIcon,
  UserCircleIcon,
} from '../../../../components/Icon';
import { useAppDispatch } from '../../../../context/app/store';
import { colors } from '../../../../theme/colors';
import { resetAuth } from '../../../Auth/slice/authSlice';
import {
  changeLanguage,
  selectLanguage,
} from '../../../Shared/slice/preferenceSlice';

const ProfileMenu = () => {
  const { t } = useTranslation();
  const language = useSelector(selectLanguage);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const profileMenus = [
    {
      key: 1,
      values: [t('profile.l_user_infomation')],
      prefix: <PassportIcon />,
      suffix: <ChevronRightIcon color={colors.gray700} />,
      onPress: () => {
        navigation.navigate('RegistrationInformation');
      },
    },
    {
      key: 2,
      values: [t('profile.l_register_infomation')],
      prefix: <UserCircleIcon />,
      suffix: <ChevronRightIcon color={colors.gray700} />,
      onPress: () => {
        navigation.navigate('TaskerStack', {
          screen: 'RegisterTasker',
          params: { profile: undefined },
        });
      },
    },
    {
      key: 3,
      values: [t('profile.l_setup_profile')],
      prefix: <UserCircleIcon />,
      suffix: <ChevronRightIcon color={colors.gray700} />,
      onPress: () => {
        navigation.navigate('TaskerStack', { screen: 'TaskerView' });
      },
    },
    {
      key: 4,
      values: [t('profile.l_history')],
      prefix: <ClockRewindIcon />,
      suffix: <ChevronRightIcon color={colors.gray700} />,
      onPress: () => {
        console.log('test');
      },
    },
    {
      key: 5,
      values: [t('profile.l_ebarimt')],
      prefix: <EBarimtIcon />,
      suffix: <ChevronRightIcon color={colors.gray700} />,
      onPress: () => {
        console.log('test');
      },
    },

    {
      key: 6,
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
      key: 7,
      values: [t('profile.t_serviceterm')],
      prefix: <FileIcon />,
      suffix: <ChevronRightIcon color={colors.gray700} />,
      onPress: () => {
        console.log('test');
      },
    },
    {
      key: 8,
      values: [t('profile.l_help')],
      prefix: <HelpCircleIcon />,
      suffix: <ChevronRightIcon color={colors.gray700} />,
      onPress: () => {
        console.log('test');
      },
    },
    {
      key: 9,
      values: [t('profile.l_logout')],
      prefix: <LogoutIcon />,
      suffix: <ChevronRightIcon color={colors.primary500} />,
      color: colors.primary500,
      onPress: () => {
        dispatch(resetAuth());
        navigation.navigate('HomeTab', { screen: 'Home' });
      },
    },
  ];
  return <GroupedMenuList listItems={profileMenus} />;
};

export default ProfileMenu;
