import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';
import FormError from '../FormError/FormError';
import { PlusIcon } from '../Icon';
import { RemarkListStyle } from './RemarkList.style';
import { ProfileModel } from '../../modules/Tasker/entities/profile.model';

export interface RemarkListProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  tags?: ProfileModel.ProfileTag[];
}

function RemarkList<T extends FieldValues>(props: RemarkListProps<T>) {
  const { label, name, tags } = props;
  const [remark, setRemark] = useState<string[]>([]);
  const navigation = useNavigation();
  const form = useFormContext();
  const { control, setValue } = form;

  const {
    field: { value },
    fieldState: { error },
  } = useController({ name, control });

  useEffect(() => {
    setRemark(value && value.length > 0 ? value : []);
  }, [value]);
  const openModal = () => {
    navigation.navigate('RemarkListView', {
      label: label,
      setValue: setValue,
      name: name,
      value: value,
      tags: tags ? tags.filter(t => t.type === name) : [],
    });
  };

  return (
    <View style={RemarkListStyle.header}>
      <Text style={RemarkListStyle.label}>{label}</Text>
      <View style={RemarkListStyle.container}>
        <TouchableOpacity
          onPress={openModal}
          style={RemarkListStyle.plusButton}
          children={<PlusIcon width={16} />}
        />
        {remark.map(item => {
          if (item) {
            return (
              <TouchableOpacity
                key={item}
                style={RemarkListStyle.plusButton}
                children={<Text style={RemarkListStyle.title}>{item}</Text>}
              />
            );
          }
        })}
      </View>
      {error?.message && <FormError error={error.message} />}
    </View>
  );
}

export default RemarkList;
