import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import HeaderBar from '../../../components/HeaderBack/HeaderBar';
import Login from '../pages/Login/Login';
import LoginOtpCheck from '../pages/LoginOtpCheck/LoginOtpCheck';
import Register from '../pages/Register/Register';
import RegisterOtpCheck from '../pages/RegisterOtpCheck/RegisterOtpCheck';
import RegisterTermAndCondition from '../pages/RegisterTermAndCondition/RegisterTermAndCondition';
import { AuthStackParamList } from './types';

const Tab = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  const { t } = useTranslation();
  return (
    <Tab.Navigator initialRouteName="Register">
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          header: () => <HeaderBar title={'Нэвтрэх'} />,
        }}
      />
      <Tab.Screen
        name="LoginOtpCheck"
        component={LoginOtpCheck}
        options={{
          header: () => <HeaderBar title={'Нэвтрэх'} />,
        }}
      />
      <Tab.Screen
        name="Register"
        component={Register}
        options={{
          header: () => <HeaderBar title={t('l_signup')} />,
        }}
      />
      <Tab.Screen
        name="RegisterOtpCheck"
        component={RegisterOtpCheck}
        options={{
          header: () => <HeaderBar title={t('l_confirm')} />,
        }}
      />
      <Tab.Screen
        name="RegisterTermAndCondition"
        component={RegisterTermAndCondition}
        options={{
          header: () => <HeaderBar title={t('profile.t_serviceterm')} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default AuthStack;
