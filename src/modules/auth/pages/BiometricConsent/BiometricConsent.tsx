import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import CustomGradientButton from '../../../../components/CustomButton/CustomGradientButton';
import CustomLinkButton from '../../../../components/CustomButton/CustomLinkButton';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import { FaceId } from '../../../../components/Icon';
import { colors } from '../../../../theme';
import { BiometricConsentStyle } from './BiometricConsent.style';

const BiometricConsent = () => {
  const navigation = useNavigation();

  return (
    <CustomSafeAreaView>
      <ContainerView style={BiometricConsentStyle.container}>
        <View style={BiometricConsentStyle.innerContainer}>
          <FaceId color={colors.primaryGradient} height={80} width={80} />
          <Text style={BiometricConsentStyle.label}>
            Та биометрик ашиглан нэвтрэхийг хүсч байна уу?
          </Text>
        </View>
        <View style={BiometricConsentStyle.messageContainer}>
          <Text style={BiometricConsentStyle.message}>
            Дахин харуулахгүй байх
          </Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <View style={{ flex: 1 }}>
            <CustomGradientButton
              title={'Тийм'}
              onPress={() => {
                navigation.navigate('CreatePin');
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <CustomLinkButton
              title={'Үгүй'}
              onPress={() => {
                navigation.navigate('HomeTab', { screen: 'Home' });
              }}
            />
          </View>
        </View>
      </ContainerView>
    </CustomSafeAreaView>
  );
};

export default BiometricConsent;
