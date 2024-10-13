import { yupResolver } from '@hookform/resolvers/yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import CustomGradientButton from '../../../../components/CustomButton/CustomGradientButton';
import CustomCheckBox from '../../../../components/CustomCheckBox/CustomCheckBox';
import CustomFormInput from '../../../../components/CustomInput/CustomFormInput';
import CustomKeyboardAvoidingView from '../../../../components/CustomKeyboardAvoidingView/CustomKeyboardAvoidingView';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import FullHeightView from '../../../../components/FullHeightView/FullHeightView';
import ImageUploadButton from '../../../../components/ImageUploadButton/ImageUploadButton';
import RemarkList from '../../../../components/RemarkList/RemarkList';
import { RemarkListStyle } from '../../../../components/RemarkList/RemarkList.style';
import { TaskerParamList } from '../../../../navigation/types';
import { FontWeight, getFontWeight, Typography } from '../../../../theme';
import { verticalScale } from '../../../../utilities';
import { TaskSchema } from '../../../../validations/schema';
import HomeStyle from '../../../Home/pages/Home/Home.style';
import {
  ProfileWorkingType,
  SharedModel,
} from '../../../Shared/entities/shared.model';
import { uploadFiles } from '../../../Shared/services/shared.service';
import { ProfileModel } from '../../entities/profile.model';
import { createProfile, getTags } from '../../service/profile.service';
import { RegisterProfileStyle } from './RegisterProfile.style';

type RegisterTaskerProps = NativeStackScreenProps<
  TaskerParamList,
  'RegisterTasker'
>;

const RegisterTasker = ({
  route,
  navigation,
}: Readonly<RegisterTaskerProps>) => {
  const { profile } = route.params;
  const { t } = useTranslation();
  const [tags, setTags] = useState<ProfileModel.ProfileTag[]>();
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(TaskSchema.registerTaskerSchema),
    defaultValues: {
      files: profile?.files,
      tagLine: profile?.tagLine,
      description: profile?.description,
      ranks: profile?.ranks,
      languages: profile?.languages,
      educations: profile?.educations,
      specialities: profile?.specialities,
      workingType: profile?.workingType,
    },
  });

  const onSubmit = (values: ProfileModel.ProfileRequest) => {
    const body = { ...values };
    if (values.files && values.files?.length > 0) {
      uploadFiles(values.files).then((res: SharedModel.File[]) => {
        if (res && res.length > 0) {
          values.files?.forEach(file => {
            if (file.id && file.url) res.push(file);
          });
          body.files = res;
        }
        createProfileRequest(body);
      });
    } else {
      createProfileRequest(body);
    }
  };

  useEffect(() => {
    getTags().then((res: ProfileModel.ProfileTag[]) => {
      setTags(res);
    });
  }, []);

  const createProfileRequest = (data: ProfileModel.ProfileRequest) => {
    createProfile(data)
      .then(() => {
        navigation.goBack();
      })
      .catch(err => {
        console.error('Error creating profile', err);
      });
  };

  return (
    <CustomSafeAreaView>
      <CustomKeyboardAvoidingView>
        <FullHeightView>
          <ScrollView>
            <ContainerView>
              <View style={RegisterProfileStyle.container}>
                <Text
                  style={[
                    HomeStyle.title,
                    Typography.textLarge,
                    getFontWeight(FontWeight.bold),
                  ]}>
                  Let's start with the basics
                </Text>
                <FormProvider {...form}>
                  <CustomFormInput
                    name="tagLine"
                    placeholder="tagLine"
                    label={t('tasker.tagLine')}
                    autoComplete="off"
                  />
                  <View style={RegisterProfileStyle.formItem}>
                    <Text style={RegisterProfileStyle.label}>
                      {t('tasker.description')}
                    </Text>
                    <CustomFormInput
                      label={t('tasker.description')}
                      name="description"
                      numberOfLines={3}
                      autoComplete="off"
                      placeholder="description"
                    />
                  </View>
                  <RemarkList
                    label={t('tasker.education')}
                    name={'educations'}
                    tags={tags}
                  />
                  <RemarkList
                    label={t('tasker.specialities')}
                    name="specialities"
                    tags={tags}
                  />
                  <RemarkList
                    label={t('tasker.languages')}
                    name="languages"
                    tags={tags}
                  />
                  <RemarkList
                    label={t('tasker.rank')}
                    name="ranks"
                    tags={tags}
                  />
                  <Text style={[RemarkListStyle.label, RemarkListStyle.header]}>
                    {t('tasker.workingType.name')}
                  </Text>
                  <Controller
                    name={'workingType'}
                    render={({ field: { onChange, value } }) => (
                      <View style={RegisterProfileStyle.workingContainer}>
                        <CustomCheckBox
                          onPress={() => onChange(ProfileWorkingType.ONLINE)}
                          value={value === ProfileWorkingType.ONLINE}>
                          <Text style={RegisterProfileStyle.alignCenter}>
                            {t(
                              `tasker.workingType.${ProfileWorkingType.ONLINE}`,
                            )}
                          </Text>
                        </CustomCheckBox>
                        <CustomCheckBox
                          onPress={() =>
                            onChange(ProfileWorkingType.PHYSICALLY)
                          }
                          value={value === ProfileWorkingType.PHYSICALLY}>
                          <Text style={RegisterProfileStyle.alignCenter}>
                            {t(
                              `tasker.workingType.${ProfileWorkingType.PHYSICALLY}`,
                            )}
                          </Text>
                        </CustomCheckBox>
                      </View>
                    )}
                  />
                  <Text
                    style={[
                      RegisterProfileStyle.label,
                      RegisterProfileStyle.formItem,
                    ]}>
                    {t('tasker.portfolio')}
                  </Text>
                  <Controller
                    name={'files'}
                    render={({ field: { onChange, value } }) => (
                      <ImageUploadButton
                        value={value}
                        limit={10 - (value ? value.length : 0)}
                        onImageSelection={images => {
                          if (value) {
                            onChange([...value, ...images]);
                          } else {
                            onChange(images);
                          }
                        }}
                        extra={{ height: verticalScale(75) }}
                        onDelete={id => {
                          const _value = value.filter(
                            (_: any, index: number) => index != id - 1,
                          );
                          onChange([..._value]);
                        }}
                      />
                    )}
                  />
                </FormProvider>
              </View>
              <CustomGradientButton
                disabled={!form.formState.isValid}
                title={t('b_continue')}
                onPress={form.handleSubmit(onSubmit)}
              />
            </ContainerView>
          </ScrollView>
        </FullHeightView>
      </CustomKeyboardAvoidingView>
    </CustomSafeAreaView>
  );
};

export default RegisterTasker;
