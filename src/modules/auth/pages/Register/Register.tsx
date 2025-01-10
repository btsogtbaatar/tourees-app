import { yupResolver } from '@hookform/resolvers/yup';
import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Keyboard,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as yup from 'yup';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import { CustomBottomSheet } from '../../../../components/CustomBottomSheet/CustomBottomSheet';
import CustomGradientButton from '../../../../components/CustomButton/CustomGradientButton';
import CustomSelectionButton from '../../../../components/CustomButton/CustomSelectionButton';
import CustomFormInput from '../../../../components/CustomInput/CustomFormInput';
import CustomKeyboardAvoidingView from '../../../../components/CustomKeyboardAvoidingView/CustomKeyboardAvoidingView';
import {
  DEFAULT_LAT,
  DEFAULT_LNG,
} from '../../../../components/CustomMapView/CustomMapOneMarker';
import Flags from '../../../../components/CustomPhoneNumberInput/Flags';
import PhoneNumberInput from '../../../../components/CustomPhoneNumberInput/PhoneNumberInput';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import InputError from '../../../../components/FormError/FormError';
import {
  BuildingIcon,
  LocationCircleIcon,
  UserIcon,
} from '../../../../components/Icon';
import ImageUploadButton from '../../../../components/ImageUploadButton/ImageUploadButton';
import Loading from '../../../../components/Loading/Loading';
import Steps from '../../../../components/Steps/Steps';
import TabController from '../../../../components/TabController/TabController';
import TextItem from '../../../../components/TextItem/TextItem';
import { RootStackParamList } from '../../../../navigation/types';
import { colors } from '../../../../theme';
import validations from '../../../../validations';
import { SharedModel, TaskerType } from '../../../Shared/entities/shared.model';
import { Address } from '../../../Shared/pages/AddressMapView/AddressMapView';
import { uploadFile } from '../../../Shared/services/shared.service';
import { AuthChannel, AuthModel } from '../../entities';
import { signUp } from '../../services';
import { RegisterStyle } from './Register.style';

type RegisterProps = NativeStackScreenProps<RootStackParamList, 'Register'>;

function Register({ navigation }: RegisterProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [authChannel, setAuthChannel] = useState<AuthChannel>(
    AuthChannel.Email,
  );
  const rootNavigation = useNavigation();
  const [address, setAddress] = useState<Address>({
    latitude: DEFAULT_LAT,
    longitude: DEFAULT_LNG,
  });
  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const _address = { ...address };
        _address.latitude = position.coords.latitude;
        _address.longitude = position.coords.longitude;
        setAddress(_address);
      },
      error => {
        console.log('Error at getting current position:', error);
      },
      { maximumAge: 0 },
    );
  }, []);
  const schema = yup.object().shape({
    email:
      authChannel === AuthChannel.Email
        ? yup
            .string()
            .required(t('login.email.errors.required'))
            .matches(validations.email, t('login.email.errors.validation'))
        : yup.string(),
    phoneNumber:
      authChannel === AuthChannel.Phone
        ? yup
            .string()
            .required(t('login.phone.errors.required'))
            .matches(
              validations.phoneNumber,
              t('login.phone.errors.validation'),
            )
        : yup.string(),
    username: yup.string().required(t('r_username')),
    firstName: yup.string().required(t('form.firstName.errors.required')),
    lastName: yup.string().required(t('form.lastName.errors.required')),
    profilePicture: yup
      .mixed<SharedModel.File>()
      .required(t('form.profile.errors.required')),
    type: yup
      .mixed<TaskerType>()
      .oneOf(Object.values(TaskerType))
      .required(t('form.taskerType.errors.required')),
    address: yup.string().required(t('form.address.errors.required')),
  });

  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const [countryCode, setCountryCode] = useState<string>('+1');

  const onContinue = (values: AuthModel.RegisterRequest) => {
    if (AuthChannel.Email === authChannel) {
      values.phoneNumber = '';
    } else if (AuthChannel.Phone === authChannel) {
      values.phoneNumber = countryCode + values.phoneNumber;
      values.email = '';
    }
    setLoading(true);
    console.log('values', values);
    signUp(values)
      .then((response: AuthModel.User) => {
        navigation.navigate('RegisterOtpCheck', {
          registration: response,
        });
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getAddress = (address: Address) => {
    const data = address.formattedAddress!.split(', ');
    return `${data[data.length - 3]}, ${data[data.length - 2]}`;
  };
  const bottomSheetRef = useRef<any>(null);
  if (loading) {
    return <Loading />;
  }
  return (
    <CustomSafeAreaView>
      <CustomKeyboardAvoidingView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ScrollView>
            <ContainerView>
              <View style={RegisterStyle.container}>
                <View style={RegisterStyle.steps}>
                  <Steps currentStepIndex={1} totalSteps={3} />
                </View>
                <View style={RegisterStyle.tabController}>
                  <TabController
                    firstTabLabel={t('i_email')}
                    secondTabLabel={t('i_phone')}
                    onSelectedTabChange={setAuthChannel}
                  />
                </View>
                <FormProvider {...form}>
                  <ScrollView>
                    {authChannel === AuthChannel.Email && (
                      <CustomFormInput
                        label={t('login.email.label')}
                        placeholder={t('login.email.placeholder')}
                        name={'email'}
                        keyboardType="email-address"
                      />
                    )}
                    {authChannel === AuthChannel.Phone && (
                      <PhoneNumberInput
                        countryCode={countryCode}
                        openModal={() => {
                          bottomSheetRef.current?.expand();
                        }}
                      />
                    )}
                    <View style={RegisterStyle.formController}>
                      <CustomFormInput
                        placeholder={t('l_username')}
                        name={'username'}
                        label={t('l_usernamelabel')}
                      />
                    </View>
                    <View style={RegisterStyle.formController}>
                      <CustomFormInput
                        placeholder={t('form.firstName.label')}
                        name={'firstName'}
                        label={t('form.firstName.placeHolder')}
                      />
                    </View>
                    <View style={RegisterStyle.formController}>
                      <CustomFormInput
                        placeholder={t('form.lastName.label')}
                        name={'lastName'}
                        label={t('form.lastName.placeHolder')}
                      />
                    </View>
                    <View style={RegisterStyle.formController}>
                      <Controller
                        name="type"
                        render={({ field: { onChange, value } }) => (
                          <View style={RegisterStyle.type}>
                            <CustomSelectionButton
                              style={RegisterStyle.typeButtons}
                              active={value === TaskerType.INDIVIDUAL}
                              onPress={() => {
                                onChange(TaskerType.INDIVIDUAL);
                              }}>
                              <UserIcon color={colors.gray300} />
                              <Text>
                                {t(`tasker.type.${TaskerType.INDIVIDUAL}`)}
                              </Text>
                            </CustomSelectionButton>
                            <CustomSelectionButton
                              style={RegisterStyle.typeButtons}
                              active={value === TaskerType.BUSINESS}
                              onPress={() => {
                                onChange(TaskerType.BUSINESS);
                              }}>
                              <BuildingIcon />
                              <Text>
                                {t(`tasker.type.${TaskerType.BUSINESS}`)}
                              </Text>
                            </CustomSelectionButton>
                          </View>
                        )}
                      />
                      {form.formState.errors.type && (
                        <InputError
                          error={form.formState.errors.type.message}
                        />
                      )}
                    </View>
                    <View style={RegisterStyle.formController}>
                      <Controller
                        name="profilePicture"
                        render={({ field: { onChange } }) => (
                          <ImageUploadButton
                            limit={1}
                            onImageSelection={images => {
                              let image = images.pop();
                              uploadFile(image)
                                .then(file => {
                                  onChange(file);
                                })
                                .catch(error => {
                                  console.log('upload error', error);
                                });
                            }}
                            onDelete={index => {
                              onChange(undefined);
                            }}
                          />
                        )}
                      />
                      {form.formState.errors.profilePicture && (
                        <InputError
                          error={form.formState.errors.profilePicture.message}
                        />
                      )}
                    </View>
                    <View style={RegisterStyle.formController}>
                      <Controller
                        name="address"
                        render={({ field: { onChange } }) => (
                          <TextItem
                            icon={
                              <LocationCircleIcon
                                color={colors.primaryGradient}
                                width={20}
                                height={20}
                              />
                            }
                            label={
                              address.displayName
                                ? address.displayName
                                : t('form.address.placeHolder')
                            }
                            buttonText={t('userRequest.address.edit')}
                            onPress={() => {
                              rootNavigation.navigate('AddressMapView', {
                                detail: false,
                                prevAddress: address,
                                title: t('form.address.label'),
                                onGoBack: address => {
                                  const _address = { ...address };
                                  _address.displayName = getAddress(_address);
                                  setAddress(_address);
                                  onChange(_address.displayName);
                                },
                              });
                            }}
                          />
                        )}
                      />
                      {form.formState.errors.address && (
                        <InputError
                          error={form.formState.errors.address.message}
                        />
                      )}
                    </View>
                  </ScrollView>
                </FormProvider>
              </View>
              <CustomGradientButton
                onPress={form.handleSubmit(onContinue)}
                title={t('signUp.continue')}
              />
            </ContainerView>
          </ScrollView>
        </TouchableWithoutFeedback>
        <CustomBottomSheet
          ref={bottomSheetRef}
          snapPoints={['50%']}
          enableDynamicSizing={false}
          enablePanDownToClose={true}>
          <Flags
            onChange={val => {
              setCountryCode(val);
              bottomSheetRef.current?.close();
            }}
          />
        </CustomBottomSheet>
      </CustomKeyboardAvoidingView>
    </CustomSafeAreaView>
  );
}

export default Register;
