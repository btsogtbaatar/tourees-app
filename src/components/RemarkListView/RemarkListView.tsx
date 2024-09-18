import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SwipeListView } from 'react-native-swipe-list-view';
import { TaskerModel } from '../../modules/Tasker/entities/tasker.model';
import { TaskerParamList } from '../../navigation/types';
import { colors } from '../../theme';
import { horizontalScale, moderateScale, verticalScale } from '../../utilities';
import CustomFormInput from '../CustomInput/CustomFormInput';
import FooterButton from '../FooterButton/FooterButton';
import { CloseCircleIcon, TrashIcon } from '../Icon';
import { RemarkListStyle } from '../RemarkList/RemarkList.style';
import { RemarkListViewStyle } from './RemarkListView.style';
import { yupResolver } from '@hookform/resolvers/yup';
import { TaskSchema } from '../../validations/schema';
import FormError from '../FormError/FormError';
import * as yup from 'yup';

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
    resolver: yupResolver(TaskSchema.remarkListSchema),
  });
  const onSubmit = (values: TaskerModel.RemarkRequest) => {
    if (values && values.remark && values.remark.trim() !== '') {
      if (listData) {
        if (listData.filter((item) => item === values.remark).length === 0) {
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
      props.navigation.goBack();
    }
  };

  const renderItem = ({ item }: { item: string }) => {
    return (
      <View style={{ alignContent: 'center' }}>
        <View
          style={{
            marginTop: verticalScale(10),
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: horizontalScale(10),
            borderRadius: moderateScale(12),
            backgroundColor: colors.brandGray,
            flex: 1,
          }}
        >
          <Text style={{ flex: 0.9, fontSize: 18 }}>{item}</Text>
          <TouchableOpacity>
            <CloseCircleIcon />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderHiddenItem = (data: any, rowMap: any) => {
    return (
      <View
        style={{
          marginTop: verticalScale(10),
          justifyContent: 'center',
          flex: 1,
          alignItems: 'flex-end',
        }}
      >
        <TouchableOpacity
          style={{
            width: horizontalScale(70),
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            borderTopRightRadius: moderateScale(14),
            borderBottomRightRadius: moderateScale(14),
          }}
          onPress={() => deleteRow(rowMap, data.item)}
        >
          <TrashIcon />
        </TouchableOpacity>
      </View>
    );
  };
  const deleteRow = (rowMap: any, rowKey: string) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item === rowKey);
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
      <View style={{ maxHeight: verticalScale(250) }}>
        <GestureHandlerRootView style={{ maxHeight: verticalScale(250) }}>
          <SwipeListView
            data={listData}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-75}
            previewRowKey="0"
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.toString()}
          />
        </GestureHandlerRootView>
      </View>
      <FooterButton
        style={RemarkListViewStyle}
        onPress={form.handleSubmit(onSubmit)}
      />
    </View>
  );
};

export default RemarkListView;
