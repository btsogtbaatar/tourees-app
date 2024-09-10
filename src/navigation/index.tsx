import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Login from '../modules/Auth/pages/Login/Login';
import LoginOtpCheck from '../modules/Auth/pages/LoginOtpCheck/LoginOtpCheck';
import Register from '../modules/Auth/pages/Register/Register';
import RegisterOtpCheck from '../modules/Auth/pages/RegisterOtpCheck/RegisterOtpCheck';
import RegisterTermAndCondition from '../modules/Auth/pages/RegisterTermAndCondition/RegisterTermAndCondition';
import HomeTabNavigator from '../modules/Home/navigation';
import RequestDetail from '../modules/Request/page/RequestDetail/RequestDetail';
import SubCategoryList from '../modules/Request/page/SubCategoryList/SubCategoryList';
import UserRequest from '../modules/Request/page/UserRequest/UserRequest';
import AddressDetail from '../modules/Shared/page/AddressDetail/AddressDetail';
import AddressMapView from '../modules/Shared/page/AddressMapView/AddressMapView';
import customScreenOption from '../theme/customHeaderOption';
import { RootStackParamList } from './types';
import TaskerStack from '../modules/Tasker/routes/routes';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Route = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      initialRouteName="HomeTab"
      screenOptions={customScreenOption}>
      <Stack.Group>
        <Stack.Screen
          options={{ title: t('headers.login') }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{ title: t('headers.login') }}
          name="LoginOtpCheck"
          component={LoginOtpCheck}
        />
        <Stack.Screen
          options={{ title: t('headers.register') }}
          name="Register"
          component={Register}
        />
        <Stack.Screen
          options={{ title: t('headers.register') }}
          name="RegisterOtpCheck"
          component={RegisterOtpCheck}
        />
        <Stack.Screen
          options={{ title: t('headers.register') }}
          name="RegisterTermAndCondition"
          component={RegisterTermAndCondition}
        />
        <Stack.Screen
          options={{ title: t('headers.home') }}
          name="HomeTab"
          component={HomeTabNavigator}
        />
        <Stack.Screen
          options={{ title: t('headers.category') }}
          name="SubCategoryList"
          component={SubCategoryList}
        />
        <Stack.Screen
          options={{ title: t('headers.request') }}
          name="UserRequest"
          component={UserRequest}
        />
        <Stack.Screen
          options={{ title: t('headers.request') }}
          name="RequestDetail"
          component={RequestDetail}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          options={{ title: t('headers.address') }}
          name="AddressMapView"
          component={AddressMapView}
        />
        <Stack.Screen
          options={{ title: t('headers.address') }}
          name="AddressDetail"
          component={AddressDetail}
        />
      </Stack.Group>
      <Stack.Screen
        options={{ headerShown: false }}
        name="TaskerStack"
        component={TaskerStack}
      />
    </Stack.Navigator>
  );
};

export default Route;
