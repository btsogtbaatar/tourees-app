import { yupResolver } from '@hookform/resolvers/yup';
import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Controller, FieldError, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import Calendar from '../../../../components/Calendar/Calendar';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import CustomGradientButton from '../../../../components/CustomButton/CustomGradientButton';
import CustomImage from '../../../../components/CustomImage/CustomImage';
import CustomFormInput from '../../../../components/CustomInput/CustomFormInput';
import {
  DEFAULT_LAT,
  DEFAULT_LNG,
} from '../../../../components/CustomMapView/CustomMapView';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import InputError from '../../../../components/FormError/FormError';
import FullHeightView from '../../../../components/FullHeightView/FullHeightView';
import { LocationCircleIcon, LocationIcon } from '../../../../components/Icon';
import ImageUploadButton from '../../../../components/ImageUploadButton/ImageUploadButton';
import TextItem from '../../../../components/TextItem/TextItem';
import { RootStackParamList } from '../../../../navigation/types';
import { colors } from '../../../../theme';
import { getFullAddress, reverseGeocode } from '../../../../utilities';
import { toastError } from '../../../../utilities/toast';
import { TaskSchema } from '../../../../validations/schema';
import { selectAuthenticated } from '../../../Auth/slice/authSlice';
import { SharedModel } from '../../../Shared/entities/shared.model';
import { uploadFile } from '../../../Shared/services/shared.service';
import { AddressType, TaskModel } from '../../entities/request.model';
import { getLastTaskFromAddress } from '../../service/request.service';
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
      country: '',
    },
    to: {
      name: AddressType.To,
      latitude: DEFAULT_LAT,
      longitude: DEFAULT_LNG,
      country: '',
    },
  });
  useEffect(() => {
    Geolocation.getCurrentPosition(
      async position => {
        const _addresses = { ...addresses };
        _addresses.from.latitude = position.coords.latitude;
        _addresses.from.longitude = position.coords.longitude;
        _addresses.to.latitude = position.coords.latitude;
        _addresses.to.longitude = position.coords.longitude;

        const countryNameFrom = await reverseGeocode(
          _addresses.from.latitude,
          _addresses.from.longitude,
        );

        if (countryNameFrom) {
          _addresses.from.country = countryNameFrom;
        }
        setAddresses(_addresses);
      },
      error => {
        toastError(error.message);
      },
    );
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getLastTaskFromAddress().then(fromAddress => {
        if (fromAddress) {
          setAddresses(_addresses => ({
            ..._addresses,
            from: fromAddress,
          }));

          form.setValue('addresses', [fromAddress]);
        }
      });
    }
  }, []);

  const onSubmit = (task: TaskModel.TaskRequest) => {
    rootNavigation.navigate('TaskBudget', {
      task,
    });
  };

  const form = useForm<TaskModel.TaskRequest>({
    resolver: yupResolver(
      TaskSchema.taskRequestSchema(
        subCategory.locationType === SharedModel.CategoryLocationType.Route
          ? 2
          : 1,
      ),
    ),
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
                      {t('request.requestName')}
                    </Text>
                    <CustomFormInput
                      name={'name'}
                      placeholder={t('request.requestNamePlaceholder')}
                    />
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
                      <InputError
                        error={(errors.files as FieldError).message}
                      />
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
                  {subCategory.locationType ===
                  SharedModel.CategoryLocationType.Route ? (
                    <View>
                      <Text style={UserRequestStyle.label}>
                        {t('userRequest.address.label')}
                      </Text>
                      <TextItem
                        icon={
                          <LocationCircleIcon
                            color={colors.primaryGradient}
                            style={UserRequestStyle.icon}
                          />
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
                            onGoBack: async _addresses => {
                              const countryNameFrom = await reverseGeocode(
                                
                                _addresses.from.latitude,
                                _addresses.from.longitude,
                              );

                              if (countryNameFrom) {
                                _addresses.from.country = countryNameFrom;
                                _addresses.to.country = countryNameFrom;
                              }
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
                            color={colors.primaryGradient}
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
                            onGoBack: async _addresses => {
                              const countryNameFrom = await reverseGeocode(
                                _addresses.from.latitude,
                                _addresses.from.longitude,
                              );

                              if (countryNameFrom) {
                                _addresses.from.country = countryNameFrom;
                                _addresses.to.country = countryNameFrom;
                             
                              }
                              
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
                    </View>
                  ) : (
                    <TextItem
                      icon={
                        <LocationCircleIcon
                          color={colors.primaryGradient}
                          style={UserRequestStyle.icon}
                        />
                      }
                      label={
                        addresses.from.address
                          ? getFullAddress(addresses.from)
                          : undefined
                      }
                      placeholder={t('userRequest.address.from')}
                      buttonText={t('userRequest.address.edit')}
                      onPress={() =>
                        rootNavigation.navigate('AddressMapView', {
                          detail: true,
                          prevAddress: addresses.from,
                          title: t('form.address.label'),
                          onGoBack: address => {
                            // TODO: improve
                            form.setValue('addresses', [address, address]);
                            form.trigger('addresses');
                            setAddresses({ from: address, to: address });
                          },
                        })
                      }
                    />
                  )}
                  {errors.addresses && (
                    <InputError
                      error={(errors.addresses as FieldError).message}
                    />
                  )}
                </FormProvider>
                <View style={UserRequestStyle.button}>
                  <CustomGradientButton
                    disabled={!form.formState.isValid}
                    title={t('b_continue')}
                    onPress={handleSubmit(onSubmit)}
                  />
                </View>
              </ContainerView>
            </ScrollView>
          </View>
        </FullHeightView>
      </View>
    </CustomSafeAreaView>
  );
}

export default UserRequest;
