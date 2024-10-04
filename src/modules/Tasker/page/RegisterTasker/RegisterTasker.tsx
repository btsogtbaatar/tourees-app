import { yupResolver } from '@hookform/resolvers/yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import CustomFormInput from '../../../../components/CustomInput/CustomFormInput';
import CustomKeyboardAvoidingView from '../../../../components/CustomKeyboardAvoidingView/CustomKeyboardAvoidingView';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import FooterButton from '../../../../components/FooterButton/FooterButton';
import FullHeightView from '../../../../components/FullHeightView/FullHeightView';
import ImageUploadButton from '../../../../components/ImageUploadButton/ImageUploadButton';
import RemarkList from '../../../../components/RemarkList/RemarkList';
import { TaskerParamList } from '../../../../navigation/types';
import { FontWeight, getFontWeight, Typography } from '../../../../theme';
import { verticalScale } from '../../../../utilities';
import { TaskSchema } from '../../../../validations/schema';
import HomeStyle from '../../../Home/pages/Home/Home.style';
import { SharedModel } from '../../../Shared/entities/shared.model';
import { uploadFiles } from '../../../Shared/services/shared.service';
import { ProfileModel } from '../../entities/profile.model';
import { createProfile, getTags } from '../../service/profile.service';
import { RegisterTaskerStyle } from './RegisterTasker.style';

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
      transportations: profile?.transportations,
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
        console.log('ssdsdsds', err);
      });
  };

  return (
    <CustomSafeAreaView>
      <CustomKeyboardAvoidingView>
        <FullHeightView>
          <ScrollView>
            <ContainerView>
              <View>
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
                    placeholder="dsds"
                    label="tagLine"
                    autoComplete="off"
                  />
                  <View style={RegisterTaskerStyle.formItem}>
                    <Text style={RegisterTaskerStyle.label}>{t('desc')}</Text>
                    <CustomFormInput
                      label="description"
                      name="description"
                      numberOfLines={3}
                      autoComplete="off"
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
                  <RemarkList
                    label={t('tasker.transportation')}
                    name="transportations"
                    tags={tags}
                  />
                  <Text
                    style={[
                      RegisterTaskerStyle.label,
                      RegisterTaskerStyle.formItem,
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
                          console.log(value, 'iddd');

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
            </ContainerView>
          </ScrollView>
          <FooterButton onPress={form.handleSubmit(onSubmit)} />
        </FullHeightView>
      </CustomKeyboardAvoidingView>
    </CustomSafeAreaView>
  );
};

export default RegisterTasker;
