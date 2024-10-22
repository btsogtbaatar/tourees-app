import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { ProfileModel } from '../../modules/Tasker/entities/profile.model';
import { TaskerModel } from '../../modules/Tasker/entities/tasker.model';
import { RootStackParamList } from '../../navigation/types';
import { verticalScale } from '../../utilities';
import CustomGradientButton from '../CustomButton/CustomGradientButton';
import CustomFormInput from '../CustomInput/CustomFormInput';
import FormError from '../FormError/FormError';
import { CloseIcon } from '../Icon';
import { RemarkListStyle } from '../RemarkList/RemarkList.style';
import { RemarkListViewStyle } from './RemarkListView.style';

type RemarkListModalProps = NativeStackScreenProps<
  RootStackParamList,
  'RemarkListView'
>;
const RemarkListView = (props: RemarkListModalProps) => {
  const { label, name, setValue, value, tags } = props.route.params;
  const [duplicateError, setDuplicateError] = useState<string>('');
  const [listData, setListData] = useState<string[]>(value);
  const [tag, setTag] = useState<ProfileModel.ProfileTag[]>();
  const { t } = useTranslation();

  const form = useForm({
    mode: 'onChange',
  });

  useEffect(() => {
    if (form.watch('remark')) {
      if (tags) {
        const filterTags = tags.filter(
          (value, index, self) =>
            index === self.findIndex(obj => obj.value === value.value) &&
            value.value
              .toUpperCase()
              .includes(form.watch('remark').toUpperCase()),
        );

        if (filterTags.length > 5) {
          setTag(filterTags.slice(0, 5));
        } else {
          setTag(filterTags);
        }
      }
    } else {
      setTag([]);
    }
  }, [form.watch('remark')]);

  const onSubmit = (values: TaskerModel.RemarkRequest) => {
    if (values && values.remark && values.remark.trim() !== '') {
      if (listData) {
        if (listData.filter(item => item === values.remark).length === 0) {
          setValue(name, [...listData, values.remark]);
          setDuplicateError('');
        } else {
          setDuplicateError(t('remark.remarkDuplicatedError'));
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
          label={t('profile.remark')}
          autoComplete="off"
        />
        {duplicateError && <FormError error={duplicateError} />}
      </FormProvider>
      <FlatList
        data={tag}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={RemarkListViewStyle.tagListContainer}
            onPress={() => {
              form.setValue('remark', item.value);
            }}>
            <Text>{item.value}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => (
          <View style={RemarkListViewStyle.marginVertical} />
        )}
        style={RemarkListViewStyle.fGrow}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: verticalScale(8) }}
      />
      <View style={[RemarkListStyle.container]}>
        {listData &&
          listData.map(item => {
            if (item) {
              return (
                <View
                  key={item}
                  style={[
                    RemarkListStyle.plusButton,
                    RemarkListViewStyle.pRight6,
                  ]}>
                  <Text style={RemarkListStyle.title}>{item}</Text>
                  <TouchableOpacity
                    style={RemarkListViewStyle.p12}
                    onPress={() => deleteItem(item)}>
                    <CloseIcon width={10} />
                  </TouchableOpacity>
                </View>
              );
            }
          })}
      </View>
      <CustomGradientButton
        title={t('b_continue')}
        onPress={form.handleSubmit(onSubmit)}
      />
    </View>
  );
};

export default RemarkListView;
