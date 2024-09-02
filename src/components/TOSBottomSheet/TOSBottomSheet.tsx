import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import FooterButton from '../FooterButton/FooterButton';
import CustomCheckBox from '../CustomCheckBox/CustomCheckBox';
import { Typography } from '../../theme';
import { verticalScale } from '../../utilities';
export interface TOSBottomSheetProps {
  handleClose: () => void;
  handleSuccess: () => void;
  reference: React.RefObject<BottomSheet> | undefined;
}

export default function TOSBottomSheet(props: TOSBottomSheetProps) {
  const { handleClose, handleSuccess, reference } = props;
  const [tosAgreement, setTosAgreement] = useState(false);

  return (
    <BottomSheet
      ref={reference}
      index={-1}
      enablePanDownToClose={true}
      snapPoints={['80%']}>
      <View
        style={{
          flex: 1,
          padding: verticalScale(16),
        }}>
        <ScrollView style={{ flex: 1 }}>
          <Text>Something about this</Text>
        </ScrollView>
        <CustomCheckBox
          value={tosAgreement}
          onPress={() => {
            setTosAgreement(state => !state);
          }}>
          <Text style={Typography.textRegular}>TOS agreement</Text>
        </CustomCheckBox>
      </View>
      <FooterButton
        disabled={!tosAgreement}
        showBackButton={true}
        onPress={handleSuccess}
        onBackPress={handleClose}
      />
    </BottomSheet>
  );
}
