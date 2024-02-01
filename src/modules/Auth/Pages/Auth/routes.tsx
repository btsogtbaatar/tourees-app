import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../../types/AuthStackParamList';
import Register from './Register/Register';
import HeaderBack from '../../../Component/HeaderBack/HeaderBack';
import RegisterUsername from './RegisterUsername/RegisterUsername';
import RegisterOtp from './RegiterOtp/RegisterOtp';
import RegisterTerm from './RegisterTerm/RegisterTerm';
import { useTranslation } from 'react-i18next';

const Tab = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  const {t} = useTranslation();
  return (
    <Tab.Navigator initialRouteName='SignUp'>
      <Tab.Screen
        name="SignUp"
        component={Register}
        options={{
          headerTitle: t('l_signup'),
          headerTitleAlign: 'center',
          headerLeft: () => <HeaderBack title="X" />,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerStyle: {
            backgroundColor: 'transparent',
          },
        }}
      />
      <Tab.Screen
        name="SignUp1"
        component={RegisterUsername}
        initialParams={{values: [{username: ''}]}}
        options={{
          headerTitle: t('l_signup'),
          headerTitleAlign: 'center',
          headerLeft: () => <HeaderBack title="X" />,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          // headerShown: false,
          headerStyle: {
            backgroundColor: 'transparent',
          },
        }}
      />
      <Tab.Screen
        name="SignUpOtp"
        component={RegisterOtp}
        options={{
          headerTitle: t('l_confirm'),
          headerTitleAlign: 'center',
          gestureEnabled: true,
          headerLeft: () => <HeaderBack title="" />,
          gestureDirection: 'horizontal',
          // headerShown: false,
          headerStyle: {
            backgroundColor: 'transparent',
          },
        }}
      />
      <Tab.Screen name='SignUpTerm' component={RegisterTerm} options={{
          headerTitle: t('t_serviceterm'),
          headerTitleAlign: 'center',
          gestureEnabled: true,
          headerLeft: () => <HeaderBack title="" />,
          gestureDirection: 'horizontal',
          // headerShown: false,
          headerStyle: {
            backgroundColor: 'transparent',
          },
        }} />
    </Tab.Navigator>
  );
};

export default AuthStack;
