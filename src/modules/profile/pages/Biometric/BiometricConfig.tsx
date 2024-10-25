import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import GroupedMenuList from '../../../../components/GroupedMenuList/GroupedMenuList';
import {
  ChevronRightIcon,
  FaceId,
  PasscodeIcon,
} from '../../../../components/Icon';
import { useAppDispatch } from '../../../../context/app/store';
import { colors } from '../../../../theme';
import { hasPin } from '../../../Auth/slice/authSlice';
import {
  disableBiometric,
  enableBiometric,
  selectBiometricEnabled,
} from '../../../Shared/slice/preferenceSlice';
import BiometricConfigStyle from './BiometricConfig.style';

const BiometricConfig = () => {
  const userHasPin = useSelector(hasPin);
  const navigation = useNavigation();
  const biometricEnabled = useSelector(selectBiometricEnabled);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const biometricMenu = [
    {
      values: [
        biometricEnabled ? t('biometric.disable') : t('biometric.enable'),
      ],
      prefix: <FaceId color={colors.gray700} />,
      suffix: <ChevronRightIcon color={colors.gray700} />,
      onPress: () => {
        if (biometricEnabled) {
          dispatch(disableBiometric());
        } else {
          dispatch(enableBiometric());
          if (!userHasPin) {
            navigation.navigate('CreatePin', {});
          } else {
            navigation.navigate('EnterPin', { authenticating: true });
          }
        }
      },
    },
  ];

  if (userHasPin === true) {
    biometricMenu.push({
      values: [t('biometric.changePin')],
      prefix: <PasscodeIcon color={colors.gray700} />,
      suffix: <ChevronRightIcon color={colors.gray700} />,
      onPress: () => {
        navigation.navigate('EnterPin', { authenticating: false });
      },
    });
  }

  return (
    <View style={BiometricConfigStyle.container}>
      <GroupedMenuList listItems={biometricMenu} />
    </View>
  );
};

export default BiometricConfig;
