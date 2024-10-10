import { yupResolver } from '@hookform/resolvers/yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import * as yup from 'yup';
import i18n from '../../../../../i18n';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import { notifyMessage } from '../../../../components/CustomToast/CustomToast';
import FooterButton from '../../../../components/FooterButton/FooterButton';
import FullHeightView from '../../../../components/FullHeightView/FullHeightView';
import { RootStackParamList } from '../../../../navigation/types';
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
          .string()
          .required(i18n.t('login.phone.errors.required'))
          .matches(
            validations.phoneNumber,
            i18n.t('login.phone.errors.validation'),
          ),
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
        notifyMessage(t('login.socialError.title'), e.message);
      });
  };
  return (
    <CustomSafeAreaView>
      <FullHeightView>
        <ContainerView>
          <View style={{ marginBottom: 20 }}>
            <FormProvider {...form}>
              <InformationFields field={field} />
            </FormProvider>
          </View>
          <FooterButton
            disabled={!form.formState.isValid}
            onPress={form.handleSubmit(handleSubmit)}
          />
        </ContainerView>
      </FullHeightView>
    </CustomSafeAreaView>
  );
}
export default UpdateInformation;
