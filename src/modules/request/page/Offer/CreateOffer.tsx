import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { t } from 'i18next';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import CustomGradientButton from '../../../../components/CustomButton/CustomGradientButton';
import CustomCurrencyInput from '../../../../components/CustomInput/CustomCurrencyInput';
import CustomInput from '../../../../components/CustomInput/CustomInput';
import CustomKeyboardAvoidingView from '../../../../components/CustomKeyboardAvoidingView/CustomKeyboardAvoidingView';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import { notifyMessage } from '../../../../components/CustomToast/CustomToast';
import { RootStackParamList } from '../../../../navigation/types';
import { colors } from '../../../../theme';
import { createOffer } from '../../service/request.service';
import { CreateOfferStyle } from './CreateOffer.style';

type CreateOfferProps = NativeStackScreenProps<
  RootStackParamList,
  'CreateOffer'
>;

const CreateOffer = (props: CreateOfferProps) => {
  const [price, setPrice] = useState<number | null>(0);
  const [description, setDescription] = useState('');

  const onSubmit = () => {
    createOffer({
      price: price!,
      description,
      taskId: props.route.params.taskId,
    }).then(() => {
      props.navigation.goBack();

      notifyMessage(t('successful'), t('offer.success'));
    });
  };

  return (
    <CustomSafeAreaView>
      <CustomKeyboardAvoidingView>
        <ContainerView style={{ backgroundColor: colors.white }}>
          <Text style={CreateOfferStyle.instruction}>
            {t('offer.enterFields')}
          </Text>
          <View style={CreateOfferStyle.innerContainer}>
            <CustomCurrencyInput value={price} onChangeValue={setPrice} />
          </View>
          <View style={{ width: '100%', flex: 2 }}>
            <Text style={CreateOfferStyle.label}>{t('offer.description')}</Text>
            <CustomInput
              value={description}
              onChangeText={setDescription}
              numberOfLines={4}
            />
          </View>
          <View style={{ width: '100%' }}>
            <CustomGradientButton
              disabled={price === 0 || price === null}
              title={t('taskPrice.submit')}
              onPress={onSubmit}
            />
          </View>
        </ContainerView>
      </CustomKeyboardAvoidingView>
    </CustomSafeAreaView>
  );
};

export default CreateOffer;
