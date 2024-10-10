import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import CustomSelectionButton from '../../../../components/CustomButton/CustomSelectionButton';
import CustomFormInput from '../../../../components/CustomInput/CustomFormInput';
import {
  DEFAULT_LAT,
  DEFAULT_LNG,
} from '../../../../components/CustomMapView/CustomMapView';
import {
  BuildingIcon,
  LocationCircleIcon,
  UserIcon,
} from '../../../../components/Icon';
import TextItem from '../../../../components/TextItem/TextItem';
import { FormField, TaskerType } from '../../../Shared/entities/shared.model';
import { Address } from '../../../Shared/pages/AddressMapView/AddressMapView';
import { InformationFieldsStyle } from './InformationFields.style';

const EmailField = () => {
  const { t } = useTranslation();
  return (
    <CustomFormInput
      label={t('login.email.label')}
      placeholder={t('login.email.placeholder')}
      name={'email'}
      keyboardType="email-address"
    />
  );
};
const PhoneField = () => {
  const { t } = useTranslation();
  return (
    <CustomFormInput
      label={t('login.phone.label')}
      placeholder={t('login.phone.placeholder')}
      name={'phoneNumber'}
      keyboardType="phone-pad"
    />
  );
};
const UserNameField = () => {
  const { t } = useTranslation();
  return (
    <CustomFormInput
      placeholder={t('l_username')}
      name={'username'}
      label={t('l_usernamelabel')}
    />
  );
};
const FullNameField = () => {
  const { t } = useTranslation();
  return (
    <View style={InformationFieldsStyle.name}>
      <CustomFormInput
        placeholder={t('form.firstName.label')}
        name={'firstName'}
        label={t('form.firstName.placeHolder')}
      />
      <CustomFormInput
        placeholder={t('form.lastName.label')}
        name={'lastName'}
        label={t('form.lastName.placeHolder')}
      />
    </View>
  );
};

const TypeField = () => {
  const { t } = useTranslation();
  return (
    <Controller
      name="type"
      render={({ field: { onChange, value } }) => (
        <View style={InformationFieldsStyle.type}>
          <CustomSelectionButton
            style={InformationFieldsStyle.typeButtons}
            active={value === TaskerType.INDIVIDUAL}
            onPress={() => {
              onChange(TaskerType.INDIVIDUAL);
            }}>
            <UserIcon />
            <Text>{t(`tasker.type.${TaskerType.INDIVIDUAL}`)}</Text>
          </CustomSelectionButton>
          <CustomSelectionButton
            style={InformationFieldsStyle.typeButtons}
            active={value === TaskerType.BUSINESS}
            onPress={() => {
              onChange(TaskerType.BUSINESS);
            }}>
            <BuildingIcon />
            <Text>{t(`tasker.type.${TaskerType.BUSINESS}`)}</Text>
          </CustomSelectionButton>
        </View>
      )}
    />
  );
};
const AddressField = () => {
  const { t } = useTranslation();
  const rootNavigation = useNavigation();
  const [address, setAddress] = useState<Address>({
    latitude: DEFAULT_LAT,
    longitude: DEFAULT_LNG,
  });
  const getAddress = (address: Address) => {
    const data = address.formattedAddress!.split(', ');
    return `${data[data.length - 3]}, ${data[data.length - 2]}`;
  };
  return (
    <Controller
      name="address"
      render={({ field: { onChange, value } }) => (
        <TextItem
          icon={<LocationCircleIcon width={20} height={20} />}
          label={value ? value : t('form.address.placeHolder')}
          buttonText={t('userRequest.address.edit')}
          onPress={() => {
            rootNavigation.navigate('AddressMapView', {
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
  );
};
type Fields = {
  field: FormField;
};
const InformationFields = ({ field }: Fields) => {
  switch (field) {
    case FormField.NAME:
      return <FullNameField />;
    case FormField.USERNAME:
      return <UserNameField />;
    case FormField.EMAIL:
      return <EmailField />;
    case FormField.PHONE:
      return <PhoneField />;
    case FormField.ADDRESS:
      return <AddressField />;
    case FormField.TYPE:
      return <TypeField />;
  }
};
export default InformationFields;
