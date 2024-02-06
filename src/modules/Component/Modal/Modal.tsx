import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';

interface ModalProps {
  isVisible?: boolean;
  children?: React.ReactElement;
  isBackPress?: boolean;
  hide?: boolean;
  isLoading?: boolean;
}

const ModalItem = ({
  isVisible,
  children,
  isBackPress,
  hide,
  isLoading,
}: ModalProps) => {
  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;
  // const provider: ModalCont
  return (
    // <View style={styles.innerContainer}>
    <Modal
      isVisible={isVisible}
      deviceWidth={deviceWidth}
      deviceHeight={deviceHeight}
      // avoidKeyboard={true}
      // useNativeDriver={true}
      // onBackButtonPress={() => isBackPress && hide}
      // propagateSwipe={true}
    >
      {children}
    </Modal>
    // </View>
  );
};

export default ModalItem;

const styles = StyleSheet.create({
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
  },
});
