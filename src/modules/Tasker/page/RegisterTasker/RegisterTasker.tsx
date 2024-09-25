import { yupResolver } from '@hookform/resolvers/yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
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
import { uploadFile } from '../../../Shared/services/shared.service';
import { TaskerModel } from '../../entities/tasker.model';
import { createTasker } from '../../service/tasker.service';
import { RegisterTaskerStyle } from './RegisterTasker.style';

type RegisterTaskerProps = NativeStackScreenProps<
  TaskerParamList,
  'RegisterTasker'
>;

const RegisterTasker = ({
  route,
  navigation,
}: Readonly<RegisterTaskerProps>) => {
  const { taskerView } = route.params;
  console.log(route.params);
  const { t } = useTranslation();
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(TaskSchema.registerTaskerSchema),
    defaultValues: {
      files: taskerView?.files,
      tag: taskerView?.tag,
      description: taskerView?.description,
      ranks: taskerView?.ranks,
      languages: taskerView?.languages,
    },
  });

  const onSubmit = (values: TaskerModel.TaskerRequest) => {
    console.log('values', values);
    if (values.files && values.files?.length > 0) {
      const uploadFiles: SharedModel.File[] = [];
      values.files.forEach(file => {
        if (!file.url) {
          uploadFile(file).then((resFile: SharedModel.File) => {
            uploadFiles.push(resFile);
            console.log(uploadFiles.length, 'upaaa', uploadFiles);
          });
        }
      });

      if (uploadFiles && uploadFiles.length > 0) {
        values.files = uploadFiles;
        createTaskerRequest(values);
      }
    } else {
      createTaskerRequest(values);
    }
  };

  const createTaskerRequest = (data: TaskerModel.TaskerRequest) => {
    console.log(data, 'dataaa');

    createTasker(data)
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
                    name="tag"
                    placeholder="dsds"
                    label="tag"
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
                    name={'education'}
                  />
                  <RemarkList
                    label={t('tasker.specialities')}
                    name="specialities"
                  />
                  <RemarkList label={t('tasker.languages')} name="languages" />
                  <RemarkList label={t('tasker.rank')} name="ranks" />
                  <RemarkList
                    label={t('tasker.transportation')}
                    name="transportation"
                  />
                  {/* <PortfolioImageUpload /> */}
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
                        limit={10 - value.length}
                        onImageSelection={images => {
                          if (value) {
                            onChange([...value, ...images]);
                          } else {
                            onChange(images);
                          }
                          // images.forEach(image => {
                          //   console.log(image, ';;', value);

                          // });
                        }}
                        extra={{ height: verticalScale(75) }}
                        onDelete={id => {
                          console.log(value, 'iddd');

                          const _value = value.filter(
                            (_: any, index: number) => index != id - 1,
                          );
                          console.log(_value, 'sss');

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
