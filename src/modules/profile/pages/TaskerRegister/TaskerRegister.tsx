import React, { useRef, useState } from 'react';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import CustomFormInput from '../../../../components/CustomInput/CustomFormInput';
import { Text, View } from 'react-native';
import { BuildingIcon, UserIcon } from '../../../../components/Icon';
import TaskerRegisterStyle from './TaskerRegister.style';
import CustomSelection from '../../../../components/CustomSelection/CustomSelection';
import FooterButton from '../../../../components/FooterButton/FooterButton';
import TOSBottomSheet from '../../../../components/TOSBottomSheet/TOSBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';

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
  type: Type.INDIVIDUAL,
};

/*
  @TODO
  Make calendar multi choice to own component and reuse
*/
export default function TaskerRegister() {
  const form = useForm<FormData>({ defaultValues: initialValue });
  const ref = useRef<BottomSheet>(null);
  return (
    <CustomSafeAreaView>
      <ContainerView>
        <FormProvider {...form}>
          <View style={TaskerRegisterStyle.container}>
            <Text>First name</Text>
            <CustomFormInput placeholder={'First name'} name={'firstName'} />
            <Text>Last name</Text>
            <CustomFormInput placeholder={'Last name'} name={'lastName'} />
            <Text>Address</Text>
            <CustomFormInput placeholder={'address'} name={'address'} />
            <Text>Tax</Text>
            <Controller
              name="type"
              render={({ field: { onChange, value } }) => (
                <View style={TaskerRegisterStyle.type}>
                  <CustomSelection
                    style={TaskerRegisterStyle.typeButtons}
                    active={value === Type.INDIVIDUAL}
                    onPress={() => {
                      onChange(Type.INDIVIDUAL);
                    }}>
                    <UserIcon />
                    <Text>Indivitual</Text>
                  </CustomSelection>
                  <CustomSelection
                    style={TaskerRegisterStyle.typeButtons}
                    active={value === Type.BUSINESS}
                    onPress={() => {
                      onChange(Type.BUSINESS);
                    }}>
                    <BuildingIcon />
                    <Text>Business</Text>
                  </CustomSelection>
                </View>
              )}
            />
          </View>
          <FooterButton
            onPress={form.handleSubmit(
              () => {
                ref.current?.expand();
              },
              error => console.log(error),
            )}
            showBackButton={true}
          />
        </FormProvider>
        <TOSBottomSheet
          reference={ref}
          handleSuccess={() => {
            console.log('success');
            ref.current?.close();
          }}
          handleClose={() => {
            console.log('sup');
            ref.current?.close();
          }}
        />
      </ContainerView>
    </CustomSafeAreaView>
  );
}
