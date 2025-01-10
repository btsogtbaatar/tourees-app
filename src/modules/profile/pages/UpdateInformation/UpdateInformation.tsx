import { yupResolver } from '@hookform/resolvers/yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import * as yup from 'yup';
import i18n from '../../../../../i18n';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import { CustomBottomSheet } from '../../../../components/CustomBottomSheet/CustomBottomSheet';
import CustomGradientButton from '../../../../components/CustomButton/CustomGradientButton';
import Flags from '../../../../components/CustomPhoneNumberInput/Flags';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import FullHeightView from '../../../../components/FullHeightView/FullHeightView';
import { RootStackParamList } from '../../../../navigation/types';
import { toastError } from '../../../../utilities/toast';
import validations from '../../../../validations';
import { FormField, TaskerType } from '../../../Shared/entities/shared.model';
import InformationFields from '../../components/InformationFields/InformationFields';
import { Schema } from '../../model/registration.model';
import { patchInformation } from '../../service/profile.service';

type UpdateInformationProps = NativeStackScreenProps<
  RootStackParamList,
  'UpdateInformation'
>;

function getScema(field: FormField): yup.ObjectSchema<Schema> {
  switch (field) {
    case FormField.NAME:
      return yup.object().shape({
        firstName: yup
          .string()
          .required(i18n.t('form.firstName.errors.required')),
        lastName: yup
          .string()
          .required(i18n.t('form.lastName.errors.required')),
      });
    case FormField.USERNAME:
      return yup.object().shape({
        username: yup.string().required(i18n.t('r_username')),
      });
    case FormField.EMAIL:
      return yup.object().shape({
        email: yup
          .string()
          .required(i18n.t('login.email.errors.required'))
          .matches(validations.email, i18n.t('login.email.errors.validation')),
      });
    case FormField.PHONE:
      return yup.object().shape({
        phoneNumber: yup
          .object()
          .shape({
            countryCode: yup.string().required(),
            lineNumber: yup
              .string()
              .required(i18n.t('login.phone.errors.required'))
              .matches(
                validations.phoneNumber,
                i18n.t('login.phone.errors.validation'),
              ),
          })
          .required(i18n.t('login.phone.errors.required')),
      });
    case FormField.ADDRESS:
      return yup.object().shape({
        address: yup.string().required(i18n.t('form.address.errors.required')),
      });
    case FormField.TYPE:
      return yup.object().shape({
        type: yup
          .mixed<TaskerType>()
          .oneOf(Object.values(TaskerType))
          .required(i18n.t('form.taskerType.errors.required')),
      });
    default:
      throw new Error('Unsupported type');
  }
}

function UpdateInformation(prop: UpdateInformationProps) {
  const insets = useSafeAreaInsets();
  const { field, defaultValues } = prop.route.params;
  const { t } = useTranslation();
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(getScema(field)),
    defaultValues: { ...defaultValues },
  });
  const handleSubmit = (value: Schema) => {
    patchInformation(value)
      .then(() => {
        prop.navigation.goBack();
      })
      .catch(e => {
        toastError(e.message);
      });
  };
  const bottomSheetRef = useRef<any>(null);
  return (
    <CustomSafeAreaView>
      <FullHeightView>
        <ContainerView>
          <View style={{ marginBottom: 20 }}>
            <FormProvider {...form}>
              <InformationFields
                field={field}
                openModal={() => {
                  bottomSheetRef.current?.expand();
                }}
              />
            </FormProvider>
          </View>
          <CustomGradientButton
            disabled={!form.formState.isValid}
            title={t('b_continue')}
            onPress={form.handleSubmit(handleSubmit)}
          />
        </ContainerView>
        <CustomBottomSheet
          ref={bottomSheetRef}
          snapPoints={['50%']}
          bottomInset={insets.bottom * -1}
          enableDynamicSizing={false}
          enablePanDownToClose={true}>
          <Flags
            onChange={val => {
              form.setValue('phoneNumber', {
                ...form.getValues('phoneNumber'),
                countryCode: val,
              });
              bottomSheetRef.current?.close();
            }}
          />
        </CustomBottomSheet>
      </FullHeightView>
    </CustomSafeAreaView>
  );
}
export default UpdateInformation;
