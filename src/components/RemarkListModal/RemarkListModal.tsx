import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { RemarkListModalStyle } from './RemarkListModal.style';
import CustomFormInput from '../CustomInput/CustomFormInput';
import { FormProvider, useForm } from 'react-hook-form';
import FooterButton from '../FooterButton/FooterButton';
import { RemarkListStyle } from '../RemarkList/RemarkList.style';
import { ModalContext } from '../../context/modal/modal.context';
import { actions } from '../../context/modal/modal.reducer';

interface RemarkListModalProps {
  label: string;
}
const RemarkListModal = ({ label }: RemarkListModalProps) => {
  const form = useForm({ mode: 'onChange' });
  const { dispatch: dispatchModal } = useContext(ModalContext);
  const onSubmit = (values: any) => {
    dispatchModal({ type: actions.HIDE });
  };
  return (
    <View style={RemarkListModalStyle.modalView}>
      <View style={RemarkListModalStyle.header}>
        <View style={RemarkListModalStyle.swipeStyle} />
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
      </FormProvider>
      <FooterButton
        style={RemarkListModalStyle}
        onPress={form.handleSubmit(onSubmit)}
      />
    </View>
  );
};

export default RemarkListModal;
