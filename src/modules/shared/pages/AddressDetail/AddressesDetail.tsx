import { yupResolver } from '@hookform/resolvers/yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import * as yup from 'yup';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import CustomFormInput from '../../../../components/CustomInput/CustomFormInput';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import FooterButton from '../../../../components/FooterButton/FooterButton';
import FullHeightView from '../../../../components/FullHeightView/FullHeightView';
import { LocationCircleIcon, LocationIcon } from '../../../../components/Icon';
import TextItem from '../../../../components/TextItem/TextItem';
import { RootStackParamList } from '../../../../navigation/types';
import { TaskSchema } from '../../../../validations/schema';
import { AddressType } from '../../../Request/entities/request.model';
import UserRequestStyle from '../../../Request/page/UserRequest/UserRequest.style';
import AddressDetailStyle from './AddressDetail.style';

interface AddressDetailItemProps {
  addressType: AddressType;
}

const AddressDetailItem = (props: AddressDetailItemProps) => {
  return (
    <View style={AddressDetailStyle.item}>
      <View style={AddressDetailStyle.controller}>
        <CustomFormInput
          clearButton={true}
          label="Байрны дугаар"
          placeholder="Жишээ: 2 - р дугаар байр"
          name={`${props.addressType.toString()}.apartment`}
        />
      </View>
      <View style={AddressDetailStyle.controller}>
        <CustomFormInput
          clearButton={true}
          keyboardType="numeric"
          label="Давхар"
          placeholder="Жишээ: 1"
          name={`${props.addressType.toString()}.floor`}
        />
      </View>
      <View style={AddressDetailStyle.controller}>
        <CustomFormInput
          clearButton={true}
          keyboardType="numeric"
          label="Тоот"
          placeholder="Жишээ: 106"
          name={`${props.addressType.toString()}.unit`}
        />
      </View>
    </View>
  );
};

type AddressDetailProps = NativeStackScreenProps<
  RootStackParamList,
  'AddressesDetail'
>;

const AddressesDetail = (props: AddressDetailProps) => {
  const { t } = useTranslation(undefined, { keyPrefix: 'addressDetail' });

  const schema = yup.object().shape({
    from: TaskSchema.addressDetailSchema,
    to: TaskSchema.addressDetailSchema,
  });

  console.log(props.route.params.addresses);

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: props.route.params.addresses,
  });

  const onPress = () => {
    form.handleSubmit(addresses => {
      props.route.params.onGoBack({
        ...props.route.params.addresses,
        from: {
          ...props.route.params.addresses.from,
          ...addresses.from,
        },
        to: {
          ...props.route.params.addresses.to,
          ...addresses.to,
        },
      });

      props.navigation.goBack();
    })();
  };

  return (
    <CustomSafeAreaView>
      <FullHeightView>
        <ContainerView>
          <FormProvider {...form}>
            <Text style={UserRequestStyle.label}>{t('label')}</Text>
            <TextItem
              hideAction={true}
              icon={<LocationCircleIcon style={UserRequestStyle.icon} />}
              label={t('from')}
            />
            <AddressDetailItem addressType={AddressType.From} />
            <TextItem
              hideAction={true}
              icon={<LocationIcon style={UserRequestStyle.icon} />}
              label={t('to')}
            />
            <AddressDetailItem addressType={AddressType.To} />
          </FormProvider>
        </ContainerView>
        <FooterButton text={t('continue')} onPress={onPress} />
      </FullHeightView>
    </CustomSafeAreaView>
  );
};

export default AddressesDetail;
