import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Controller, FieldError, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import Calendar from '../../../../components/Calendar/Calendar';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import CustomImage from '../../../../components/CustomImage/CustomImage';
import CustomFormInput from '../../../../components/CustomInput/CustomFormInput';
import {
  DEFAULT_LAT,
  DEFAULT_LNG,
} from '../../../../components/CustomMapView/CustomMapView';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import { notifyMessage } from '../../../../components/CustomToast/CustomToast';
import FooterButton from '../../../../components/FooterButton/FooterButton';
import InputError from '../../../../components/FormError/FormError';
import FullHeightView from '../../../../components/FullHeightView/FullHeightView';
import { LocationCircleIcon, LocationIcon } from '../../../../components/Icon';
import ImageUploadButton from '../../../../components/ImageUploadButton/ImageUploadButton';
import TextItem from '../../../../components/TextItem/TextItem';
import { RootStackParamList } from '../../../../navigation/types';
import { colors } from '../../../../theme';
import { TaskSchema } from '../../../../validations/schema';
import { selectAuthenticated } from '../../../Auth/slice/authSlice';
import { uploadFile } from '../../../Shared/services/shared.service';
import { AddressType, TaskModel } from '../../entities/request.model';
import {
  createTask,
  getLastTaskFromAddress,
} from '../../service/request.service';
import UserRequestStyle from './UserRequest.style';

type UserRequestProps = NativeStackScreenProps<
  RootStackParamList,
  'UserRequest'
>;

function UserRequest({ route }: Readonly<UserRequestProps>) {
  const { t } = useTranslation();
  const rootNavigation = useNavigation();
  const subCategory = route.params.item;
  const isAuthenticated = useSelector(selectAuthenticated);

  const [addresses, setAddresses] = useState<TaskModel.Addresses>({
    from: {
      name: AddressType.From,
      latitude: DEFAULT_LAT,
      longitude: DEFAULT_LNG,
    },
    to: {
      name: AddressType.To,
      latitude: DEFAULT_LAT,
      longitude: DEFAULT_LNG,
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      getLastTaskFromAddress().then(fromAddress => {
        if (fromAddress) {
          setAddresses(_addresses => ({
            ..._addresses,
            from: fromAddress,
          }));
        }
      });
    }
  }, []);

  const onSubmit = (task: TaskModel.TaskRequest) => {
    createTask(task).then(() => {
      notifyMessage(
        t('userRequest.success.title'),
        t('userRequest.success.message'),
        () => {
          rootNavigation.navigate('HomeTab', { screen: 'Home' });
        },
      );
    });
  };

  const form = useForm<TaskModel.TaskRequest>({
    resolver: yupResolver(TaskSchema.taskRequestSchema),
    defaultValues: {
      subCategory: {
        id: subCategory.id,
      },
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const getFullAddress = (address?: TaskModel.Address) => {
    let _address = address?.address;

    if (address?.apartment) {
      _address = `${address?.apartment}, ` + _address;
    }

    if (address?.floor) {
      _address = `${address?.floor} давхар, ` + _address;
    }

    if (address?.unit) {
      _address = `${address?.unit} тоот, ` + _address;
    }

    return _address;
  };

  return (
    <CustomSafeAreaView style={{ backgroundColor: colors.white }}>
      <View style={UserRequestStyle.container}>
        <FullHeightView>
          <ContainerView style={UserRequestStyle.headerContainer}>
            <View style={UserRequestStyle.labelContainer}>
              <Text style={UserRequestStyle.title}>{subCategory.name}</Text>
              <Text style={UserRequestStyle.subtitle}>
                {subCategory.description}
              </Text>
            </View>
            <CustomImage
              style={UserRequestStyle.image}
              source={{
                uri: subCategory.image.url,
              }}
            />
          </ContainerView>
          <View style={UserRequestStyle.bodyContainer}>
            <ScrollView>
              <ContainerView>
                <FormProvider {...form}>
                  <View style={UserRequestStyle.formItem}>
                    <Text style={UserRequestStyle.label}>
                      {t('request.requestDeliveryDate')}
                    </Text>
                    <Controller
                      name="timeRange"
                      render={({ field: { onChange } }) => (
                        <Calendar onSuccess={value => onChange(value)} />
                      )}
                    />
                    {errors.timeRange && (
                      <InputError error={'Өдөр, цагийг оруулна уу.'} />
                    )}
                  </View>
                  <View style={UserRequestStyle.formItem}>
                    <Text style={UserRequestStyle.label}>
                      {t('request.requestImages')}
                    </Text>
                    <Controller
                      name="files"
                      render={({ field: { onChange, value } }) => (
                        <ImageUploadButton
                          limit={0}
                          onDelete={id => {
                            const _value = value.filter(
                              (_: any, index: number) => index !== id,
                            );
                            onChange([..._value]);
                          }}
                          onImageSelection={images => {
                            images.forEach(image => {
                              uploadFile(image).then(file => {
                                if (value) {
                                  onChange([...value, file]);
                                } else {
                                  onChange([file]);
                                }
                              });
                            });
                          }}
                        />
                      )}
                    />
                    {errors.files && (
                      <InputError
                        error={(errors.files as FieldError).message}
                      />
                    )}
                  </View>
                  <View style={UserRequestStyle.formItem}>
                    <Text style={UserRequestStyle.label}>
                      {t('request.requestDetail')}
                    </Text>
                    <CustomFormInput
                      name={'description'}
                      placeholder={subCategory.instruction}
                      numberOfLines={3}
                    />
                  </View>
                  <View>
                    <Text style={UserRequestStyle.label}>
                      {t('userRequest.address.label')}
                    </Text>
                    <TextItem
                      icon={
                        <LocationCircleIcon style={UserRequestStyle.icon} />
                      }
                      label={
                        addresses.from.address
                          ? getFullAddress(addresses.from)
                          : undefined
                      }
                      placeholder={t('userRequest.address.from')}
                      buttonText={t('userRequest.address.edit')}
                      onPress={() =>
                        rootNavigation.navigate('AddressesMapView', {
                          addresses: addresses,
                          addressType: AddressType.From,
                          onGoBack: _addresses => {
                            form.setValue('addresses', [
                              _addresses.from,
                              _addresses.to,
                            ]);

                            form.trigger('addresses');

                            setAddresses({ ..._addresses });
                          },
                        })
                      }
                    />
                    <TextItem
                      icon={
                        <LocationIcon
                          color={colors.primary500}
                          style={UserRequestStyle.icon}
                        />
                      }
                      label={
                        addresses.to.address
                          ? getFullAddress(addresses.to)
                          : undefined
                      }
                      placeholder={t('userRequest.address.to')}
                      buttonText={t('userRequest.address.edit')}
                      onPress={() =>
                        rootNavigation.navigate('AddressesMapView', {
                          addresses: addresses,
                          addressType: AddressType.To,
                          onGoBack: _addresses => {
                            form.setValue('addresses', [
                              _addresses.from,
                              _addresses.to,
                            ]);

                            form.trigger('addresses');

                            setAddresses({ ..._addresses });
                          },
                        })
                      }
                    />
                    {errors.addresses && (
                      <InputError
                        error={(errors.addresses as FieldError).message}
                      />
                    )}
                  </View>
                </FormProvider>
              </ContainerView>
              <FooterButton
                onPress={handleSubmit(onSubmit)}
                showBackButton={true}
              />
            </ScrollView>
          </View>
        </FullHeightView>
      </View>
    </CustomSafeAreaView>
  );
}

export default UserRequest;
