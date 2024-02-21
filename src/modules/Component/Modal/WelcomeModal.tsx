import React from 'react';
import { Text, View } from 'react-native';
import { Colors } from '../../../../constants/Colors';
import { LogoIcon } from '../../../assets/svg';
import { horizontalScale, verticalScale } from '../../../uitls/metrics';
import LinearButton from '../LoginButton/LinearButton';

interface WelcomeModalProps {
  title: string;
  subTitle: string;
  onClick: () => void;
  buttonText?: string;
}

const WelcomeModal = ({
  title,
  subTitle,
  onClick,
  buttonText,
}: WelcomeModalProps) => {
  return (
    <View
      style={{
        backgroundColor: Colors.textWhite,
        borderRadius: horizontalScale(24),
        alignItems: 'center',
        paddingHorizontal: horizontalScale(24),
        paddingVertical: verticalScale(16),
      }}>
      <LogoIcon />
      <View style={{ marginTop: verticalScale(16), alignItems: 'center' }}>
        <Text
          style={{
            color: Colors.primaryColor,
            fontSize: 18,
            fontWeight: '700',
            lineHeight: 27,
          }}>
          {title}
        </Text>
        <Text
          style={{
            color: Colors.gray500,
            lineHeight: 15,
            marginTop: verticalScale(8),
          }}>
          {subTitle}
        </Text>
      </View>
      <LinearButton
        onClick={onClick}
        extra={{
          height: verticalScale(40),
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: verticalScale(16),
        }}
        buttonText={buttonText}
      />
    </View>
  );
};

export default WelcomeModal;
