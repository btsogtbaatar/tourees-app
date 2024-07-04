import { useNavigation } from '@react-navigation/native';
import { Checkbox } from 'native-base';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import FooterButton from '../../../../components/FooterButton/FooterButton';
import WelcomeModal from '../../../../components/Modal/WelcomeModal';
import { colors } from '../../../../constants/colors';
import { ModalContext } from '../../../../context/modal/modal.context';
import { actions } from '../../../../context/modal/modal.reducer';
import { RootStackParamList } from '../../../../navigation/types';
import styles from './RegisterTermAndCondition.style';

const RegisterTermAndCondition = () => {
  const navigation = useNavigation<RootStackParamList>();
  const [isChecked, setIsChecked] = useState<boolean>(false);
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
            navigation.navigate('HomeStack', { screen: 'Dashboard' });
            dispatchModal({ type: actions.HIDE });
          }}
          buttonText={t('signUp.understand')}
        />
      ),
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.title}>1. Ерөнхий нөхцөл</Text>
          <Text style={styles.subTitle}>
            {'\u2022'} Энэхүү нөхцөлийн зорилго нь “Нэр платформ”-ийн хэрэглэгч
            болон платформ хөгжүүлэгч хоорондын харилцааг зохицуулахад оршино.
          </Text>
          <Text style={styles.subTitle}>
            {'\u2022'} Энэхүү нөхцөлийн зорилго нь “Нэр платформ”-ийн хэрэглэгч
            болон платформ хөгжүүлэгч хоорондын харилцааг зохицуулахад оршино.
          </Text>
        </View>
        <View>
          <Text style={styles.title}>2. Платформ ашиглах журам</Text>
          <Text style={[styles.subTitle, styles.label]}>
            Нэр платформын эрх, үүрэг
          </Text>
          <Text style={styles.subTitle}>
            {'\u2022'} Платформын функц, боломж, цар хүрээг нэмэгдүүлэх бюу
            зогсоох.
          </Text>
        </View>
        <View
          style={[
            styles.checkContainer,
            {
              backgroundColor: isChecked ? colors.placeColor : colors.textWhite,
              borderColor: isChecked ? colors.primaryColor : colors.otpBorder,
            },
          ]}>
          <Checkbox
            isChecked={isChecked}
            value="term"
            _icon={{ color: colors.textWhite }}
            _pressed={{
              bgColor: colors.primaryColor,
              borderColor: colors.primaryColor,
            }}
            _important={{
              borderColor: colors.primaryColor,
            }}
            _checked={{
              borderColor: colors.primaryColor,
              bg: colors.primaryColor,
            }}
            borderRadius={7.5}
            onChange={(value: boolean) => {
              setIsChecked(value);
            }}>
            <Text style={styles.checkText}>Үйлчилгээний нөхцөл зөвшөөрөх</Text>
          </Checkbox>
        </View>
      </View>
      <FooterButton
        text={'Нэвтрэх'}
        onPress={onSubmit}
        back={false}
        btnDisabled={!isChecked}
        backColor={true}
      />
    </View>
  );
};

export default RegisterTermAndCondition;
