import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../../../constants/Colors';
import { DashboardStackParamList } from '../../../types/DashboardStackParamList';
import { horizontalScale, verticalScale } from '../../../uitls/metrics';
import { useTranslation } from 'react-i18next';

interface LoginButtonProps {
  title?: string;
  onClick?: () => void;
}

const LoginButton = ({ title, onClick }: LoginButtonProps) => {
  const navigation = useNavigation<DashboardStackParamList>();
  const { t } = useTranslation();

  const onPress = () => {
    navigation.navigate('AuthStack', { screen: 'SignUp' });
  };

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      locations={[0, 1]}
      colors={['#FF9646', '#FA6432']}
      style={{
        borderRadius: horizontalScale(12),
      }}>
      <TouchableOpacity
        style={{
          paddingHorizontal: horizontalScale(12),
          height: verticalScale(32),
          justifyContent: 'center',
          maxHeight: verticalScale(32),
        }}
        onPress={onClick ? onClick : onPress}>
        <Text
          style={{
            color: Colors.textWhite,
            fontWeight: '700',
            lineHeight: 18,
            fontSize: 14,
            fontFamily: 'Nunito',
          }}>
          {title ? title : t('signUp.login')}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default LoginButton;
