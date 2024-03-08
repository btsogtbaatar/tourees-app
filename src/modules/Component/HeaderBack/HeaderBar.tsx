import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { verticalScale } from '../../../uitls/metrics';
import LoginButton from '../LoginButton/LoginButton';
import { LogoIcon } from '../../../assets/svg';
import { useNavigation } from '@react-navigation/native';
import ArrowLeftIcon from '../../../assets/svg/dashboard/ArrowLeftIcon';

interface HeaderBarProps {
  title?: string;
  backButton?: boolean;
  suffix?: React.ReactNode;
  isDashboard?: boolean;
}

const HeaderBar = ({
  title,
  backButton = true,
  suffix,
  isDashboard = false,
}: HeaderBarProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const canGoBack = backButton && navigation.canGoBack();
  console.log(canGoBack);

  return (
    <View
      style={{
        paddingTop:
          insets.top + verticalScale(Platform.OS === 'android' ? 12 : 0),
        padding: verticalScale(16),
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      {canGoBack && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon />
        </TouchableOpacity>
      )}
      {title && (
        <>
          <Text style={{ textAlign: 'center' }}>test</Text>
          <Text />
        </>
      )}

      {isDashboard && (
        <>
          <LogoIcon />
          <LoginButton />
        </>
      )}
    </View>
  );
};

export default HeaderBar;
