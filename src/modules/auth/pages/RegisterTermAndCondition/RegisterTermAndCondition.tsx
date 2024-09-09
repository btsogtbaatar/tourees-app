import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import CustomGradientButton from '../../../../components/CustomButton/CustomGradientButton';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import WelcomeModal from '../../../../components/Modal/WelcomeModal';
import Steps from '../../../../components/Steps/Steps';
import { ModalContext } from '../../../../context/modal/modal.context';
import { actions } from '../../../../context/modal/modal.reducer';
import { RegisterTermAndConditionStyle } from './RegisterTermAndCondition.style';

const RegisterTermAndCondition = () => {
  const navigation = useNavigation();
  const [isChecked] = useState<boolean>(true);
  const { t } = useTranslation();

  const { dispatch: dispatchModal } = useContext(ModalContext);

  const onSubmit = () => {
    dispatchModal({
      type: actions.SHOW,
      component: (
        <WelcomeModal
          title={t('signUp.hello')}
          subTitle={t('signUp.welcome_seed')}
          onClick={() => {
            navigation.navigate('HomeTab', { screen: 'Home' });
            dispatchModal({ type: actions.HIDE });
          }}
          buttonText={t('signUp.understand')}
        />
      ),
    });
  };

  return (
    <CustomSafeAreaView>
      <ContainerView>
        <View style={RegisterTermAndConditionStyle.container}>
          <Steps totalSteps={3} currentStepIndex={3} />
          <View style={RegisterTermAndConditionStyle.subContainer}>
            <Text style={RegisterTermAndConditionStyle.title}>
              1. Ерөнхий нөхцөл
            </Text>
            <Text style={RegisterTermAndConditionStyle.subTitle}>
              {'\u2022'} Энэхүү нөхцөлийн зорилго нь “Нэр платформ”-ийн
              хэрэглэгч болон платформ хөгжүүлэгч хоорондын харилцааг
              зохицуулахад оршино.
            </Text>
            <Text style={RegisterTermAndConditionStyle.subTitle}>
              {'\u2022'} Энэхүү нөхцөлийн зорилго нь “Нэр платформ”-ийн
              хэрэглэгч болон платформ хөгжүүлэгч хоорондын харилцааг
              зохицуулахад оршино.
            </Text>
          </View>
          <View>
            <Text style={RegisterTermAndConditionStyle.title}>
              2. Платформ ашиглах журам
            </Text>
            <Text
              style={[
                RegisterTermAndConditionStyle.subTitle,
                RegisterTermAndConditionStyle.label,
              ]}>
              Нэр платформын эрх, үүрэг
            </Text>
            <Text style={RegisterTermAndConditionStyle.subTitle}>
              {'\u2022'} Платформын функц, боломж, цар хүрээг нэмэгдүүлэх бюу
              зогсоох.
            </Text>
          </View>
        </View>
        <CustomGradientButton
          title={'Нэвтрэх'}
          onPress={onSubmit}
          disabled={!isChecked}
        />
      </ContainerView>
    </CustomSafeAreaView>
  );
};

export default RegisterTermAndCondition;
