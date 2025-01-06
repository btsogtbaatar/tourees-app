import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { colors, Typography } from '../../theme';
import { useTranslation } from 'react-i18next';
import { Flag } from './Flags';
import { useController, useFormContext } from 'react-hook-form';
import CustomInput from '../CustomInput/CustomInput';
import FormError from '../FormError/FormError';

interface PhoneNumberInputProps {
  openModal: () => void;
  countryCode: string;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  openModal,
  countryCode,
}) => {
  const { t } = useTranslation();
  const form = useFormContext();

  const { control } = form;

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name: 'phoneNumber',
    control,
  });
  return (
    <View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          gap: 10,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: colors.white,
            borderColor: colors.gray100,
            borderWidth: 1,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            gap: 4,
            paddingHorizontal: 8,
          }}
          onPress={openModal}>
          <Flag code={countryCode} size={18} />
          <Text style={Typography.textSmaller}>{countryCode}</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <CustomInput
            label={t('login.phone.label')}
            placeholder={t('login.phone.placeholder')}
            value={value}
            onChangeText={text => onChange(text)}
            keyboardType="phone-pad"
          />
        </View>
      </View>
      {error?.message && <FormError error={error.message} />}
    </View>
  );
};

export default PhoneNumberInput;
