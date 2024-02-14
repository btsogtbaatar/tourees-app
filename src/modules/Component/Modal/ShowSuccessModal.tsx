import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../../../constants/Colors';
import { horizontalScale, verticalScale } from '../../../uitls/metrics';
import ModalContainer from './ModalContainer';

interface SuccesModalProps {
  isSuccess: boolean;
  title: string;
  subTitle?: string;
  isVisible?: boolean;
}

const ShowModal = (props: SuccesModalProps) => {
  return (
    <ModalContainer isVisible={props.isVisible}>
      <View style={styles.content}>
        <View>
          <Text>icon</Text>
        </View>
        <Text>{props.title}</Text>
      </View>
    </ModalContainer>
  );
};

export default ShowModal;

export const styles = StyleSheet.create({
  content: {
    backgroundColor: Colors.textWhite,
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(24),
    borderRadius: horizontalScale(16),
  },
});
