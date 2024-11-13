import { useNavigation } from '@react-navigation/native';
import { default as React } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import i18n from '../../../i18n';
import { useAppDispatch } from '../../context/app/store';
import { resetAuth, selectUser } from '../../modules/Auth/slice/authSlice';
import {
  changeLanguage,
  selectLanguage,
} from '../../modules/Shared/slice/preferenceSlice';
import { colors } from '../../theme';
import GroupedMenuList from '../GroupedMenuList/GroupedMenuList';
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
  const language = useSelector(selectLanguage);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);

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
        let selectedLanguage = language === 'mn' ? 'en' : 'mn';
        i18n.changeLanguage(selectedLanguage).then(() => {
          dispatch(changeLanguage(selectedLanguage));
        });
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
