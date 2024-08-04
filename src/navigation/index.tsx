import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from '../modules/Auth/pages/Login/Login';
import LoginOtpCheck from '../modules/Auth/pages/LoginOtpCheck/LoginOtpCheck';
import Register from '../modules/Auth/pages/Register/Register';
import RegisterOtpCheck from '../modules/Auth/pages/RegisterOtpCheck/RegisterOtpCheck';
import RegisterTermAndCondition from '../modules/Auth/pages/RegisterTermAndCondition/RegisterTermAndCondition';
import HomeTabNavigator from '../modules/Home/navigation';
import RequestDetail from '../modules/Request/page/RequestDetail/RequestDetail';
import SubCategoryList from '../modules/Request/page/SubCategoryList/SubCategoryList';
import UserRequest from '../modules/Request/page/UserRequest/UserRequest';
import AddressMapView from '../modules/Shared/page/AddressMapView/AddressMapView';
import customScreenOption from '../theme/customHeaderOption';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Route = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeTab"
      screenOptions={customScreenOption}>
      <Stack.Group>
        <Stack.Screen
          options={{ title: 'Нэвтрэх' }}
          name="Login"
          component={Login}
        />
        <Stack.Screen name="LoginOtpCheck" component={LoginOtpCheck} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="RegisterOtpCheck" component={RegisterOtpCheck} />
        <Stack.Screen
          name="RegisterTermAndCondition"
          component={RegisterTermAndCondition}
        />
        <Stack.Screen name="HomeTab" component={HomeTabNavigator} />
        <Stack.Screen name="SubCategoryList" component={SubCategoryList} />
        <Stack.Screen name="UserRequest" component={UserRequest} />
        <Stack.Screen name="RequestDetail" component={RequestDetail} />
        <Stack.Screen name="AddressMapView" component={AddressMapView} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default Route;
