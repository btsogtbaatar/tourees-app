import React, { useContext } from 'react';
import { Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { horizontalScale } from '../../utilities';
import { ModalContext } from '../../context/modal/modal.context';
import { actions } from '../../context/modal/modal.reducer';

interface ModalContainerProps {
  isVisible?: boolean;
  children?: React.ReactElement;
  direction?: 'bottom' | 'center' | 'off';
  closeOnBackButtonPress?: boolean;
}

const ModalContainer = ({
  isVisible,
  children,
  direction = 'center',
  closeOnBackButtonPress = true,
}: ModalContainerProps) => {
  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;
  const { dispatch: dispatchModal } = useContext(ModalContext);

  return (
    <Modal
      isVisible={isVisible}
      deviceWidth={deviceWidth}
      deviceHeight={deviceHeight}
      swipeDirection={direction === 'bottom' ? 'down' : undefined}
      style={
        direction === 'center'
          ? { justifyContent: 'center', margin: horizontalScale(16) }
          : { justifyContent: 'flex-end', margin: 0 }
      }
      onBackButtonPress={() => {
        closeOnBackButtonPress && dispatchModal({ type: actions.HIDE });
      }}
      onBackdropPress={() => {
        closeOnBackButtonPress && dispatchModal({ type: actions.HIDE });
      }}>
      {children ?? <></>}
    </Modal>
  );
};

export default ModalContainer;
