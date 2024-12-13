import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import CustomGradientButton from '../../../../components/CustomButton/CustomGradientButton';
import CustomCurrencyInput from '../../../../components/CustomInput/CustomCurrencyInput';
import CustomInput from '../../../../components/CustomInput/CustomInput';
import CustomKeyboardAvoidingView from '../../../../components/CustomKeyboardAvoidingView/CustomKeyboardAvoidingView';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import { RootStackParamList } from '../../../../navigation/types';
import { colors } from '../../../../theme';
import { toastSuccess } from '../../../../utilities/toast';
import { TaskModel } from '../../entities/request.model';
import {
  createOffer,
  getOffer,
  updateOffer,
} from '../../service/request.service';
import { CreateOfferStyle } from './CreateOffer.style';

type CreateOfferProps = NativeStackScreenProps<
  RootStackParamList,
  'CreateOffer'
>;

type EditOfferProps = NativeStackScreenProps<RootStackParamList, 'EditOffer'>;

const CreateOffer = (props: CreateOfferProps | EditOfferProps) => {
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [offer, setOffer] = useState<TaskModel.OfferResponse>();

  useEffect(() => {
    if (props.route.name === 'EditOffer') {
      getOffer(props.route.params.id!).then(offer => {
        setOffer(offer);
        setPrice(offer.price);
        setDescription(offer.description);
      });
    }
  }, []);

  const onSubmit = () => {
    if (props.route.name === 'CreateOffer') {
      createOffer({
        price: price,
        description: description,
        taskId: props.route.params.taskId!,
      }).then(() => {
        props.navigation.goBack();
        toastSuccess(t('offer.successCreate'));
      });
    } else {
      updateOffer({
        id: offer?.id!,
        price: price,
        description: description,
      }).then(() => {
        props.navigation.goBack();
        toastSuccess(t('offer.successEdit'));
      });
    }
  };

  return (
    <CustomKeyboardAvoidingView>
      <CustomSafeAreaView>
        <ContainerView style={{ backgroundColor: colors.white }}>
          <Text style={CreateOfferStyle.instruction}>
            {t('offer.enterFields')}
          </Text>
          <View style={CreateOfferStyle.innerContainer}>
            <CustomCurrencyInput
              value={price}
              onChangeValue={value => {
                if (value) {
                  setPrice(value);
                }
              }}
            />
          </View>
          <View style={{ flex: 2 }}>
            <Text style={CreateOfferStyle.label}>{t('offer.description')}</Text>
            <CustomInput
              value={description}
              onChangeText={value => {
                if (value) {
                  setDescription(value);
                }
              }}
              numberOfLines={4}
            />
          </View>
          <View>
            <CustomGradientButton
              disabled={price === 0 || price === null}
              title={t('taskBudget.submit')}
              onPress={onSubmit}
            />
          </View>
        </ContainerView>
      </CustomSafeAreaView>
    </CustomKeyboardAvoidingView>
  );
};

export default CreateOffer;
