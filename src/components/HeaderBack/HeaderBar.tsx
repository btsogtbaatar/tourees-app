import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LogoIcon } from '../../assets/svg';
import ArrowLeftIcon from '../../assets/svg/dashboard/ArrowLeftIcon';
import { horizontalScale, verticalScale } from '../../utilities/metrics';
import LoginButton from '../LoginButton/LoginButton';

interface HeaderBarProps {
  title?: string;
  backButton?: boolean;
  suffix?: React.ReactNode;
  isDashboard?: boolean;
}

const HeaderBar = ({
  title,
  backButton = true,
  isDashboard = false,
}: HeaderBarProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const canGoBack = backButton && navigation.canGoBack();

  return (
    <View
      style={{
        paddingTop:
          insets.top + verticalScale(Platform.OS === 'android' ? 12 : 0),
        paddingHorizontal: horizontalScale(16),
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      {canGoBack && !isDashboard && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon />
        </TouchableOpacity>
      )}

      {title && (
        <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
            lineHeight: 24,
            fontWeight: '600',
            fontFamily: 'Nunito',
            flex: 1,
            marginRight: 20,
          }}>
          {title}
        </Text>
      )}

      {isDashboard && (
        <>
          <LogoIcon />
          <LoginButton
            onClick={() =>
              navigation.navigate('AuthStack', { screen: 'Login' })
            }
          />
        </>
      )}
    </View>
  );
};

export default HeaderBar;
