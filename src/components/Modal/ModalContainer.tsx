import React, { useContext } from 'react';
import { Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { horizontalScale } from '../../utilities';
import { ModalContext } from '../../context/modal/modal.context';
import { actions } from '../../context/modal/modal.reducer';

interface ModalContainerProps {
  isVisible?: boolean;
  children?: React.ReactElement;
  direction?: 'bottom' | 'center' | 'off' | 'left' | 'right';
  closeOnBackDropPress?: boolean;
  closeOnSwipeComplete?: boolean;
}

const ModalContainer = ({
  isVisible,
  children,
  direction = 'center',
  closeOnBackDropPress = false,
  closeOnSwipeComplete = false,
}: ModalContainerProps) => {
  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;
  const { dispatch: dispatchModal } = useContext(ModalContext);

  return (
    <Modal
      isVisible={isVisible}
      deviceWidth={deviceWidth}
      deviceHeight={deviceHeight}
      swipeDirection={direction === 'bottom' ? 'down' : 'up'}
      onBackdropPress={() => {
        closeOnBackDropPress && dispatchModal({ type: actions.HIDE });
      }}
      onSwipeComplete={() => {
        closeOnSwipeComplete && dispatchModal({ type: actions.HIDE });
      }}
      style={
        direction === 'center'
          ? { justifyContent: 'center', margin: horizontalScale(16) }
          : { justifyContent: 'flex-end', margin: 0 }
      }
      avoidKeyboard
    >
      {children ?? <></>}
    </Modal>
  );
};

export default ModalContainer;
