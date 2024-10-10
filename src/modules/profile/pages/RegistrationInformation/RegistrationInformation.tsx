import React from 'react';
import GroupedMenuList from '../../../../components/GroupedMenuList/GroupedMenuList';
import {
  BuildingIcon,
  ChevronRightIcon,
  LocationIcon,
  MailIcon,
  PassportIcon,
  PhoneIcon,
  UserCircleIcon,
} from '../../../../components/Icon';
import { colors } from '../../../../theme';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../Auth/slice/authSlice';
import { useNavigation } from '@react-navigation/native';
import { FormField, TaskerType } from '../../../Shared/entities/shared.model';

function replaceDots(value?: string): string {
  if (!value) {
    return '';
  }
  if (value.length > 15) {
    value = value.substring(0, 15);
    value += '...';
  }
  return value;
}

const RegistrationInformation = () => {
  const user = useSelector(selectUser);
  const { t } = useTranslation();
  const navigation = useNavigation();
  const informationMenu = [
    {
      values: [
        t('form.fullName.label'),
        user?.firstName && user?.lastName
          ? replaceDots(`${user?.lastName} ${user?.firstName}`)
          : '',
      ],
      prefix: <PassportIcon />,
      suffix: <ChevronRightIcon color={colors.gray700} />,
      onPress: () => {
        navigation.navigate('UpdateInformation', {
          field: FormField.NAME,
          defaultValues: {
            firstName: user?.firstName ? user?.firstName : '',
            lastName: user?.lastName ? user?.lastName : '',
          },
        });
      },
    },
    {
      values: [t('l_usernamelabel'), replaceDots(user?.username)],
      prefix: <UserCircleIcon />,
      suffix: <ChevronRightIcon color={colors.gray700} />,
      onPress: () => {
        navigation.navigate('UpdateInformation', {
          field: FormField.USERNAME,
          defaultValues: {
            username: user?.username ? user?.username : '',
          },
        });
      },
    },
    {
      values: [t('b_email'), replaceDots(user?.email)],
      prefix: <MailIcon />,
      suffix: <ChevronRightIcon color={colors.gray700} />,
      onPress: () => {
        navigation.navigate('UpdateInformation', {
          field: FormField.EMAIL,
          defaultValues: {
            email: user?.email ? user?.email : '',
          },
        });
      },
    },
    {
      values: [t('b_phonenumber'), replaceDots(user?.phoneNumber)],
      prefix: <PhoneIcon />,
      suffix: <ChevronRightIcon color={colors.gray700} />,
      onPress: () => {
        navigation.navigate('UpdateInformation', {
          field: FormField.PHONE,
          defaultValues: {
            phoneNumber: user?.phoneNumber ? user?.phoneNumber : '',
          },
        });
      },
    },
    {
      values: [t('form.address.label'), replaceDots(user?.contractor?.address)],
      prefix: <LocationIcon color={colors.gray700} />,
      suffix: <ChevronRightIcon color={colors.gray700} />,
      onPress: () => {
        navigation.navigate('UpdateInformation', {
          field: FormField.ADDRESS,
          defaultValues: {
            address: user?.contractor?.address ? user?.contractor?.address : '',
          },
        });
      },
    },
    {
      values: [
        t('form.taskerType.label'),
        user?.contractor?.type
          ? t(`tasker.type.${user?.contractor?.type}`)
          : '',
      ],
      prefix: <BuildingIcon color={colors.gray700} />,
      suffix: <ChevronRightIcon color={colors.gray700} />,
      onPress: () => {
        navigation.navigate('UpdateInformation', {
          field: FormField.TYPE,
          defaultValues: {
            type: user?.contractor?.type
              ? user?.contractor?.type
              : TaskerType.INDIVIDUAL,
          },
        });
      },
    },
  ];

  return <GroupedMenuList listItems={informationMenu} />;
};

export default RegistrationInformation;
