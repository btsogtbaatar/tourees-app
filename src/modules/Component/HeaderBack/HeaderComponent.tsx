import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { height, horizontalScale, verticalScale } from '../../../uitls/metrics';
import { Colors } from '../../../../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../../assets/svg/dashboard/Logo';
import LoginButton from '../LoginButton/LoginButton';
import { LogoIcon } from '../../../assets/svg';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { DashboardStackParamList } from '../../../types/DashboardStackParamList';

interface HeaderProps {
  isAuth: boolean;
  index: number;
  title?: string;
}

const HeaderComponent = (props: HeaderProps) => {
  const { isAuth, index, title } = props;
  const navigation = useNavigation<DashboardStackParamList>();
  console.log(navigation, 'prop');

  return (
    <>
      {isAuth ? (
        <Text>test</Text>
      ) : (
        <View>
          {index == 0 ? (
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                width: '100%',
              }}>
              <View>
                <LogoIcon />
              </View>
              <LoginButton />
            </View>
          ) : (
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                lineHeight: 30,
                color: Colors.textHeader,
              }}>
              {title}
            </Text>
          )}
        </View>
      )}
    </>
  );
};

export default HeaderComponent;
