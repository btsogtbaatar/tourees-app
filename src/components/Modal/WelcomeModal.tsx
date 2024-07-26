import React from 'react';
import { Text, View } from 'react-native';
import { LogoIcon } from '../../assets/svg';
import { colors } from '../../constants/colors';
import { horizontalScale, verticalScale } from '../../utilities';
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
        backgroundColor: colors.white,
        borderRadius: horizontalScale(24),
        alignItems: 'center',
        paddingHorizontal: horizontalScale(24),
        paddingVertical: verticalScale(16),
      }}>
      <LogoIcon />
      <View style={{ marginTop: verticalScale(16), alignItems: 'center' }}>
        <Text
          style={{
            color: colors.primaryColor,
            fontSize: 18,
            fontWeight: '700',
            lineHeight: 27,
            fontFamily: 'Nunito',
            textAlign: 'center',
          }}>
          {title}
        </Text>
        <Text
          style={{
            color: colors.gray500,
            lineHeight: 15,
            marginTop: verticalScale(8),
            fontFamily: 'Nunito',
            textAlign: 'center',
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
