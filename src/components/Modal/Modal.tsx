import React, { useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { ModalContext } from '../../context/modal/modal.context';
import { actions as modalActions } from '../../context/modal/modal.reducer';
import { useTranslation } from 'react-i18next';

export interface ModalProps {
  title: string;
  text?: string;
  submitButtonText?: string;
  onSubmit?: () => void;
  dismissButtonText?: string;
  onDismiss?: () => void;
}

const Modal = (props: ModalProps) => {
  const { dispatch: dispatchModal } = useContext(ModalContext);
  const { t } = useTranslation();

  const closeModal = () => {
    dispatchModal({
      type: modalActions.HIDE,
    });
  };

  return (
    <View style={modalStyles.innerContainer}>
      <Text>{props.title}</Text>
      <Text>{props.text}</Text>
      {props.onSubmit && (
        <Button
          title={props.submitButtonText ?? t('l_submitLabel')}
          onPress={props.onSubmit}></Button>
      )}
      <Button
        title={props.dismissButtonText ?? t('l_dismissLabel')}
        onPress={props.onDismiss ?? closeModal}></Button>
    </View>
  );
};

export const modalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  innerContainer: {
    width: '70%',
    height: '20%',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    alignSelf: 'center',
  },
});

export default Modal;
