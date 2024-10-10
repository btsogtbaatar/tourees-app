import React from 'react';
import { Platform, Text, View } from 'react-native';
import { horizontalScale, verticalScale } from '../../utilities';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import CustomHeaderBackButton from '../CustomHeader/CustomHeaderBackButton';
import { colors } from '../../theme/colors';
import { HeaderBarStyle } from './HeaderBar.style';

interface HeaderBarProps {
  backButtonVisible?: boolean;
  title?: string;
  suffix?: React.ReactNode;
}

const HeaderBar = ({ backButtonVisible, title, suffix }: HeaderBarProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const isCanGoBack = backButtonVisible && navigation.canGoBack;
  return (
    <View
      style={[
        HeaderBarStyle.container,
        {
          paddingTop:
            insets.top + verticalScale(Platform.OS === 'android' ? 12 : 0),
        },
      ]}>
      {isCanGoBack && (
        <CustomHeaderBackButton
          color={colors.gray700}
          navigation={navigation}
          canGoBack={isCanGoBack()}
        />
      )}
      {title && <Text style={HeaderBarStyle.title}>{title}</Text>}
      {suffix}
    </View>
  );
};

export default HeaderBar;
