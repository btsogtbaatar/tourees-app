import { Checkbox } from 'native-base';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Colors } from '../../../../../../constants/Colors';
import FooterButton from '../../../../Component/FooterButton/FooterButton';
import styles from './RegisterTerm.style';

const RegisterTerm = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

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
              backgroundColor: isChecked ? Colors.placeColor : Colors.textWhite,
              borderColor: isChecked ? Colors.primaryColor : Colors.otpBorder,
            },
          ]}>
          <Checkbox
            isChecked={isChecked}
            value="term"
            _icon={{ color: Colors.textWhite }}
            _pressed={{
              bgColor: Colors.primaryColor,
              borderColor: Colors.primaryColor,
            }}
            _important={{
              borderColor: Colors.primaryColor,
            }}
            _checked={{
              borderColor: Colors.primaryColor,
              bg: Colors.primaryColor,
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
        onPress={function (): void {
          throw new Error('Function not implemented.');
        }}
        back={false}
        btnDisabled={!isChecked}
        backColor={true}
      />
    </View>
  );
};

export default RegisterTerm;
