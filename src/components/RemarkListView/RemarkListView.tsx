import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';
import { TaskerModel } from '../../modules/Tasker/entities/tasker.model';
import { TaskerParamList } from '../../navigation/types';
import { horizontalScale, moderateScale, verticalScale } from '../../utilities';
import CustomFormInput from '../CustomInput/CustomFormInput';
import FooterButton from '../FooterButton/FooterButton';
import FormError from '../FormError/FormError';
import { CloseIcon, TrashIcon } from '../Icon';
import { RemarkListStyle } from '../RemarkList/RemarkList.style';
import { RemarkListViewStyle } from './RemarkListView.style';

type RemarkListModalProps = NativeStackScreenProps<
  TaskerParamList,
  'RemarkListView'
>;
const RemarkListView = (props: RemarkListModalProps) => {
  const { label, name, setValue, value } = props.route.params;
  const [duplicateError, setDuplicateError] = useState<string>('');
  const [listData, setListData] = useState<string[]>(value);

  const form = useForm({
    mode: 'onChange',
  });

  const onSubmit = (values: TaskerModel.RemarkRequest) => {
    if (values && values.remark && values.remark.trim() !== '') {
      if (listData) {
        if (listData.filter(item => item === values.remark).length === 0) {
          setValue(name, [...listData, values.remark]);
          setDuplicateError('');
        } else {
          setDuplicateError('davhardaj bn');
          return;
        }
      } else {
        setDuplicateError('');
        setValue(name, [values.remark]);
      }
    }
    props.navigation.goBack();
  };

  const deleteItem = (item: string) => {
    const newData = [...listData];
    const prevIndex = listData.findIndex(i => i === item);
    newData.splice(prevIndex, 1);
    setListData(newData);
    setValue(name, newData);
  };

  return (
    <View style={RemarkListViewStyle.modalView}>
      <View style={RemarkListViewStyle.header}>
        <View style={RemarkListViewStyle.swipeStyle} />
      </View>
      <View style={RemarkListStyle.header}>
        <Text style={RemarkListStyle.label}>{label}</Text>
      </View>
      <FormProvider {...form}>
        <CustomFormInput
          placeholder={label}
          name="remark"
          label="remark"
          autoComplete="off"
        />
        {duplicateError && <FormError error={duplicateError} />}
      </FormProvider>
      <View style={[RemarkListStyle.container]}>
        {listData &&
          listData.map(item => {
            if (item) {
              return (
                <View
                  key={item}
                  style={[
                    RemarkListStyle.plusButton,
                    { paddingRight: horizontalScale(6) },
                  ]}>
                  <Text style={RemarkListStyle.title}>{item}</Text>
                  <TouchableOpacity
                    style={{ paddingLeft: 12 }}
                    onPress={() => deleteItem(item)}>
                    <CloseIcon width={10} />
                  </TouchableOpacity>
                </View>
              );
            }
          })}
      </View>
      <FooterButton
        style={RemarkListViewStyle}
        onPress={form.handleSubmit(onSubmit)}
      />
    </View>
  );
};

export default RemarkListView;
