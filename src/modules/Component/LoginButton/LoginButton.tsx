import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../../../constants/Colors';
import { DashboardStackParamList } from '../../../types/DashboardStackParamList';
import { horizontalScale, verticalScale } from '../../../uitls/metrics';


const LoginButton = () => {
  const navigation = useNavigation<DashboardStackParamList>();

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
        onPress={() => navigation.navigate('AuthStack', { screen: 'SignUp' })}>
        <Text
          style={{
            color: Colors.textWhite,
            fontWeight: '700',
            lineHeight: 18,
          }}>
          Нэвтрэх
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default LoginButton;
