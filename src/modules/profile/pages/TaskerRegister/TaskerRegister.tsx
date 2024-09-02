import React from 'react';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import { FormProvider, useForm } from 'react-hook-form';
import CustomFormInput from '../../../../components/CustomInput/CustomFormInput';
import { Text, View } from 'react-native';
import { verticalScale } from '../../../../utilities';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomCheckBox from '../../../../components/CustomCheckBox/CustomCheckBox';
import { Typography } from '../../../../theme';

enum Type {
  INDIVIDUAL = 'indivdual',
  BUSINESS = 'business',
}
type FormData = {
  firstName: string;
  lastName: string;
  address: string;
  type: Type;
  check: boolean;
};
const initialValue: FormData = {
  firstName: '',
  lastName: '',
  address: '',
  check: false,
  type: Type.BUSINESS,
};
export default function TaskerRegister() {
  const form = useForm<FormData>({ defaultValues: initialValue });
  return (
    <CustomSafeAreaView>
      <ContainerView>
        <FormProvider {...form}>
          <View style={{ gap: verticalScale(10) }}>
            <Text>Hello</Text>
            <CustomFormInput
              placeholder={'firstName'}
              name={'firstName'}
              keyboardType="phone-pad"
            />
            <Text>Hello</Text>
            <CustomFormInput
              placeholder={'lastName'}
              name={'lastName'}
              keyboardType="phone-pad"
            />
            <Text>Hello</Text>
            <CustomFormInput
              placeholder={'address'}
              name={'address'}
              keyboardType="phone-pad"
            />
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity>
                <Text>Indivitual</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>Business</Text>
              </TouchableOpacity>
            </View>
            <CustomCheckBox value={true} onPress={() => {}}>
              <Text style={Typography.textRegular}>hello</Text>
            </CustomCheckBox>
          </View>
        </FormProvider>
      </ContainerView>
    </CustomSafeAreaView>
  );
}
