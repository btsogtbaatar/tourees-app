import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../../types/AuthStackParamList';
import Register from './Register/Register';
import HeaderBack from '../../../Component/HeaderBack/HeaderBack';
import RegisterUsername from './RegisterUsername/RegisterUsername';
import RegisterOtp from './RegiterOtp/RegisterOtp';
import RegisterTerm from './RegisterTerm/RegisterTerm';
import { useTranslation } from 'react-i18next';
import Login from './Login/Login';
import LoginOtpCheck from './Login/LoginOtpCheck';
import HeaderBar from '../../../Component/HeaderBack/HeaderBar';

const Tab = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  const { t } = useTranslation();
  return (
    <Tab.Navigator initialRouteName="SignUp">
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          header: () => <HeaderBar title={"Нэвтрэх"} />,
        }}
      />
      <Tab.Screen
        name="LoginOtpCheck"
        component={LoginOtpCheck}
        options={{
          header: () => <HeaderBar title={"Нэвтрэх"} />,
        }}
      />
      <Tab.Screen
        name="SignUp"
        component={Register}
        options={{
          header: () => <HeaderBar title={t('l_signup')} />,
        }}
      />
      <Tab.Screen
        name="SignUp1"
        component={RegisterUsername}
        initialParams={{ values: [{ username: '' }] }}
        options={{
          header: () => <HeaderBar title={t('l_signup')} />,
        }}
      />
      <Tab.Screen
        name="SignUpOtp"
        component={RegisterOtp}
        options={{
          header: () => <HeaderBar title={t('l_confirm')} />,
        }}
      />
      <Tab.Screen
        name="SignUpTerm"
        component={RegisterTerm}
        options={{
          header: () => <HeaderBar title={t('profile.t_serviceterm')} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default AuthStack;
