import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../../../constants/Colors';
import { horizontalScale, verticalScale } from '../../../uitls/metrics';
import ModalContainer from './ModalContainer';
import { ModalContext } from '../../../context/modal/modal.context';
import { actions } from '../../../context/modal/modal.reducer';
import Modal from './Modal';

interface SuccesModalProps {
  isSuccess?: boolean;
  title?: string;
  subTitle?: string;
  isVisible?: boolean;
}

export const ShowModal = () => {
  const { dispatch: dispatchModal } = useContext(ModalContext);
  console.log('modal, show ');

  dispatchModal({
    type: actions.SHOW,
    component: <Modal title="test" />,
  });
};

const SuccessModal = () => {
  return (
    <View style={styles.content}>
      <View>
        <Text>test</Text>
      </View>
    </View>
  );
};

export default SuccessModal;

export const styles = StyleSheet.create({
  content: {
    backgroundColor: Colors.textWhite,
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(24),
    borderRadius: horizontalScale(16),
  },
});
