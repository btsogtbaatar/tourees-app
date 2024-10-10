import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import BiometricConsent from '../modules/Auth/pages/BiometricConsent/BiometricConsent';
import CreatePin from '../modules/Auth/pages/CreatePin/CreatePin';
import Login from '../modules/Auth/pages/Login/Login';
import LoginOtpCheck from '../modules/Auth/pages/LoginOtpCheck/LoginOtpCheck';
import Register from '../modules/Auth/pages/Register/Register';
import RegisterOtpCheck from '../modules/Auth/pages/RegisterOtpCheck/RegisterOtpCheck';
import RegisterTermAndCondition from '../modules/Auth/pages/RegisterTermAndCondition/RegisterTermAndCondition';
import RetypePin from '../modules/Auth/pages/RetypePin/RetypePin';
import HomeTabNavigator from '../modules/Home/navigation';
import CreateOffer from '../modules/Request/page/Offer/CreateOffer';
import SubCategoryList from '../modules/Request/page/SubCategoryList/SubCategoryList';
import TaskPrice from '../modules/Request/page/TaskBudget/TaskBudget';
import TaskDetail from '../modules/Request/page/TaskDetail/TaskDetail';
import UserRequest from '../modules/Request/page/UserRequest/UserRequest';
import AddressesDetail from '../modules/Shared/pages/AddressDetail/AddressesDetail';
import AddressesMapView from '../modules/Shared/pages/AddressMapView/AddressesMapView';
import AddressMapView from '../modules/Shared/pages/AddressMapView/AddressMapView';
import customScreenOption from '../theme/customHeaderOption';
import { RootStackParamList } from './types';

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
          options={{ title: t('headers.biometric') }}
          name="BiometricConsent"
          component={BiometricConsent}
        />
        <Stack.Screen
          options={{ title: t('headers.createPin') }}
          name="CreatePin"
          component={CreatePin}
        />
        <Stack.Screen
          options={{ title: t('headers.retypePin') }}
          name="RetypePin"
          component={RetypePin}
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
          name="TaskDetail"
          component={TaskDetail}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          options={{ title: t('headers.address') }}
          name="AddressesMapView"
          component={AddressesMapView}
        />
        <Stack.Screen
          options={{ title: t('headers.address') }}
          name="AddressMapView"
          component={AddressMapView}
        />
        <Stack.Screen
          options={{ title: t('headers.address') }}
          name="AddressesDetail"
          component={AddressesDetail}
        />
        <Stack.Screen
          options={{ title: t('headers.taskPrice') }}
          name="TaskPrice"
          component={TaskPrice}
        />
        <Stack.Screen
          options={{ title: t('headers.createOffer') }}
          name="CreateOffer"
          component={CreateOffer}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default Route;
