import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ModalItem from './Modal';
import { Colors } from '../../../../constants/Colors';
import { horizontalScale, verticalScale } from '../../../uitls/metrics';

interface SuccesModalProps {
  isSuccess: boolean;
  title: string;
  subTitle?: string;
  isVisible?: boolean;
}

const ShowModal = (props: SuccesModalProps) => {
  return (
    <ModalItem
      isVisible={props.isVisible}
      children={
        <View style={styles.content}>
          <View>
            <Text>icon</Text>
          </View>
          <Text>{props.title}</Text>
        </View>
      }
    />
  );
};

export default ShowModal;

const styles = StyleSheet.create({
  content: {
    backgroundColor: Colors.textWhite,
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(24),
    borderRadius: horizontalScale(16),
  },
});
