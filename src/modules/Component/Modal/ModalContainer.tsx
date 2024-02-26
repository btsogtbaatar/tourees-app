import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import Modal from 'react-native-modal';

interface ModalContainerProps {
  isVisible?: boolean;
  children?: React.ReactElement;
}

const ModalContainer = ({ isVisible, children }: ModalContainerProps) => {
  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;

  return (
    <Modal
      isVisible={isVisible}
      deviceWidth={deviceWidth}
      deviceHeight={deviceHeight}>
      {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}> */}
      {children}
      {/* </View> */}
    </Modal>
  );
};

export default ModalContainer;
