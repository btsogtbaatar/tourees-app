import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import CustomGradientButton from '../../../../components/CustomButton/CustomGradientButton';
import CustomLinkButton from '../../../../components/CustomButton/CustomLinkButton';
import CustomCheckBox from '../../../../components/CustomCheckBox/CustomCheckBox';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import { FaceId } from '../../../../components/Icon';
import { useAppDispatch } from '../../../../context/app/store';
import { colors } from '../../../../theme';
import {
  selectDontShowBiometricConsent,
  setBiometricDontShowAgain
} from '../../../Shared/slice/preferenceSlice';
import { hasPin } from '../../slice/authSlice';
import { BiometricConsentStyle } from './BiometricConsent.style';

const BiometricConsent = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const userHasPin = useSelector(hasPin);
  const dontShowBiometricConsent = useSelector(selectDontShowBiometricConsent);
  const dispatch = useAppDispatch();

  return (
    <CustomSafeAreaView>
      <ContainerView style={BiometricConsentStyle.container}>
        <View style={BiometricConsentStyle.innerContainer}>
          <FaceId color={colors.primaryGradient} height={80} width={80} />
          <Text style={BiometricConsentStyle.label}>
            {t('biometric.consent')}
          </Text>
        </View>
        <View style={BiometricConsentStyle.messageContainer}>
          <CustomCheckBox
            onPress={() => {
              dispatch(setBiometricDontShowAgain(!dontShowBiometricConsent));
            }}
            value={dontShowBiometricConsent === true}>
            <Text style={BiometricConsentStyle.message}>
              {t('biometric.doNotShowAgain')}
            </Text>
          </CustomCheckBox>
        </View>
        <View style={BiometricConsentStyle.buttons}>
          <View style={BiometricConsentStyle.flexOne}>
            <CustomLinkButton
              title={t('biometric.decline')}
              onPress={() => {
                navigation.navigate('HomeTab', { screen: 'Home' });
              }}
            />
          </View>
          <View style={BiometricConsentStyle.flexOne}>
            <CustomGradientButton
              title={t('biometric.accept')}
              onPress={() => {
                if (userHasPin) {
                  navigation.navigate('EnterPin', { authenticating: true });
                } else {
                  navigation.navigate('CreatePin', {});
                }
              }}
            />
          </View>
        </View>
      </ContainerView>
    </CustomSafeAreaView>
  );
};

export default BiometricConsent;
