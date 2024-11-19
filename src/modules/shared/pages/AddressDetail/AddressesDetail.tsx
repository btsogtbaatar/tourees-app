import { yupResolver } from '@hookform/resolvers/yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { t } from 'i18next';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import * as yup from 'yup';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import CustomGradientButton from '../../../../components/CustomButton/CustomGradientButton';
import CustomFormInput from '../../../../components/CustomInput/CustomFormInput';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import FullHeightView from '../../../../components/FullHeightView/FullHeightView';
import { LocationCircleIcon, LocationIcon } from '../../../../components/Icon';
import TextItem from '../../../../components/TextItem/TextItem';
import { RootStackParamList } from '../../../../navigation/types';
import { colors } from '../../../../theme';
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
          label={t('addressDetail.apartmentLabel')}
          placeholder={t('addressDetail.apartmentPlaceholder')}
          name={`${props.addressType.toString()}.apartment`}
        />
      </View>
      <View style={AddressDetailStyle.controller}>
        <CustomFormInput
          clearButton={true}
          keyboardType="numeric"
          label={t('addressDetail.floorLabel')}
          placeholder={t('addressDetail.floorPlaceholder')}
          name={`${props.addressType.toString()}.floor`}
        />
      </View>
      <View style={AddressDetailStyle.controller}>
        <CustomFormInput
          clearButton={true}
          keyboardType="numeric"
          label={t('addressDetail.unitLabel')}
          placeholder={t('addressDetail.unitPlaceholder')}
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
  const { t } = useTranslation();

  const schema = yup.object().shape({
    from: TaskSchema.addressDetailSchema,
    to: TaskSchema.addressDetailSchema,
  });

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
      <ScrollView>
        <FullHeightView>
          <ContainerView>
            <View style={UserRequestStyle.flexOne}>
              <FormProvider {...form}>
                <Text style={UserRequestStyle.label}>
                  {t('addressDetail.label')}
                </Text>
                <TextItem
                  hideAction={true}
                  icon={
                    <LocationCircleIcon
                      color={colors.primaryGradient}
                      style={UserRequestStyle.icon}
                    />
                  }
                  label={t('addressDetail.from')}
                />
                <AddressDetailItem addressType={AddressType.From} />
                <TextItem
                  hideAction={true}
                  icon={
                    <LocationIcon
                      color={colors.primaryGradient}
                      style={UserRequestStyle.icon}
                    />
                  }
                  label={t('addressDetail.to')}
                />
                <AddressDetailItem addressType={AddressType.To} />
              </FormProvider>
            </View>
            <CustomGradientButton
              disabled={!form.formState.isValid}
              title={t('b_continue')}
              onPress={onPress}
            />
          </ContainerView>
        </FullHeightView>
      </ScrollView>
    </CustomSafeAreaView>
  );
};

export default AddressesDetail;
