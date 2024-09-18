import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import CustomFormInput from '../../../../components/CustomInput/CustomFormInput';
import CustomKeyboardAvoidingView from '../../../../components/CustomKeyboardAvoidingView/CustomKeyboardAvoidingView';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import CustomTouchableWithoutFeedback from '../../../../components/CustomTouchableWithoutFeedback/CustomTouchableWithoutFeedback';
import FooterButton from '../../../../components/FooterButton/FooterButton';
import FullHeightView from '../../../../components/FullHeightView/FullHeightView';
import RemarkList from '../../../../components/RemarkList/RemarkList';
import { TaskerParamList } from '../../../../navigation/types';
import { FontWeight, getFontWeight, Typography } from '../../../../theme';
import HomeStyle from '../../../Home/pages/Home/Home.style';
import { RegisterTaskerStyle } from './RegisterTasker.style';
import PortfolioImageUpload from '../../../../components/PortfolioImageUpload/PortfolioImageUpload';
import ImageUploadButton, {
  ImageSource,
} from '../../../../components/ImageUploadButton/ImageUploadButton';
import { verticalScale } from '../../../../utilities';
import { yupResolver } from '@hookform/resolvers/yup';
import { TaskSchema } from '../../../../validations/schema';

type RegisterOtpCheckProps = NativeStackScreenProps<
  TaskerParamList,
  'RegisterTasker'
>;

const RegisterTasker = ({
  route,
  navigation,
}: Readonly<RegisterOtpCheckProps>) => {
  const { t } = useTranslation();
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(TaskSchema.registerTaskerSchema),
  });
  const onSubmit = (values: any) => {
    console.log('values', values);
  };
  return (
    <CustomSafeAreaView>
      <CustomKeyboardAvoidingView>
        <CustomTouchableWithoutFeedback>
          <FullHeightView>
            <ScrollView>
              <ContainerView>
                <View>
                  <Text
                    style={[
                      HomeStyle.title,
                      Typography.textLarge,
                      getFontWeight(FontWeight.bold),
                    ]}
                  >
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
                    <RemarkList
                      label={t('tasker.languages')}
                      name="languages"
                    />
                    <RemarkList label={t('tasker.rank')} name="rank" />
                    <RemarkList
                      label={t('tasker.transportation')}
                      name="transportation"
                    />
                    {/* <PortfolioImageUpload /> */}
                    <Text
                      style={[
                        RegisterTaskerStyle.label,
                        RegisterTaskerStyle.formItem,
                      ]}
                    >
                      {t('tasker.portfolio')}
                    </Text>
                    <ImageUploadButton
                      onImageSelection={(images) => {
                        console.log('images');
                      }}
                      extra={{ height: verticalScale(75) }}
                      limitSize={11}
                    />
                  </FormProvider>
                </View>
              </ContainerView>
            </ScrollView>
            <FooterButton onPress={form.handleSubmit(onSubmit)} />
          </FullHeightView>
        </CustomTouchableWithoutFeedback>
      </CustomKeyboardAvoidingView>
    </CustomSafeAreaView>
  );
};

export default RegisterTasker;
