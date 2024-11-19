import { useNavigation } from '@react-navigation/native';
import { default as React, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getSupportedBiometryType } from 'react-native-keychain';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../context/app/store';
import useLanguage from '../../hooks/useLanguage';
import { resetAuth, selectUser } from '../../modules/Auth/slice/authSlice';
import { colors } from '../../theme';
import GroupedMenuList, {
  FilledListProps,
} from '../GroupedMenuList/GroupedMenuList';
import {
  ChevronRightIcon,
  FaceId,
  GlobalIcon,
  HelpCircleIcon,
  LogoutIcon,
  MessagePlusSquareIcon,
  PassportIcon,
  UserCircleIcon,
} from '../Icon';
const ProfileMenu = () => {
  const { t } = useTranslation();
  const { toggleLanguage } = useLanguage();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const user = useSelector(selectUser);
  const [profileMenus, setProfileMenus] = useState<FilledListProps[]>([]);

  const initialProfileMenus = [
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
        navigation.navigate('RegisterTasker', { profile: undefined });
      },
    },
    {
      values: [t('profile.l_service')],
      prefix: <HelpCircleIcon />,
      suffix: <ChevronRightIcon color={colors.gray700} />,
      onPress: () => {
        navigation.navigate('TaskerService');
      },
    },
    {
      key: 3,
      values: [t('profile.l_setup_profile')],
      prefix: <UserCircleIcon />,
      suffix: <ChevronRightIcon color={colors.gray700} />,
      onPress: () => {
        if (user && user.id) {
          navigation.navigate('TaskerView', { id: user.id });
        }
      },
    },
    {
      key: 3,
      values: [t('profile.l_my_offer_tasks')],
      prefix: <MessagePlusSquareIcon color={colors.gray700} />,
      suffix: <ChevronRightIcon color={colors.gray700} />,
      onPress: () => {
        navigation.navigate('MyOfferTasks');
      },
    },
    {
      key: 3,
      values: [t('headers.biometricConfig')],
      prefix: <FaceId color={colors.gray700} />,
      suffix: <ChevronRightIcon color={colors.gray700} />,
      onPress: () => {
        navigation.navigate('BiometricConfig');
      },
    },
    {
      key: 6,
      values: [t('profile.language'), t('profile.language_label')],
      prefix: <GlobalIcon />,
      suffix: <ChevronRightIcon color={colors.gray700} />,
      onPress: () => {
        toggleLanguage();
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

  useEffect(() => {
    getSupportedBiometryType().then(biometricType => {
      if (biometricType === null) {
        setProfileMenus(initialProfileMenus.filter(x => x.key !== 3));
      } else {
        setProfileMenus(initialProfileMenus);
      }
    });
  }, []);

  return <GroupedMenuList listItems={profileMenus} />;
};

export default ProfileMenu;
