/* eslint-disable react/no-unstable-nested-components */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import Register from '../modules/Auth/Pages/Auth/Register/Register';
import HeaderBack from '../modules/Component/HeaderBack/HeaderBack';
import RegisterUsername from '../modules/Auth/Pages/Auth/RegisterUsername/RegisterUsername';
import AuthStack from '../modules/Auth/Pages/Auth/routes';
import { authAction } from '../context/actions/actions';
import DashboardMainStack from '../modules/Dashboard/routes';
import { MainStackParamList } from '../types/MainStackParamList';
import MainRouterStack from '../modules/Dashboard/Pages/routes/mainRoutes';
import { authStore } from '../context/auth/store';
import { useBears } from '../context/store';

const Stack = createNativeStackNavigator<MainStackParamList>();

const Route = () => {
  const isAuth = true;

  // const setStoreToken = authStore(state => state.setToken);

  useEffect(() => {
    console.log('devug');

    authAction.setClientToken();
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* {isAuth ? ( */}
      <>
        <Stack.Group>
          <Stack.Screen name="DashboardStack" component={DashboardMainStack} />
          <Stack.Screen name="RequestStack" component={MainRouterStack} />
          <Stack.Screen name="AuthStack" component={AuthStack} />
        </Stack.Group>
        {/* <Stack.Group>
            <Stack.Screen name="DashboardStac" component={DashboardStack} />
          </Stack.Group> */}
      </>
      {/* ) : (
        <Stack.Group>
          <Stack.Screen name="AuthStack" component={AuthStack} />
        </Stack.Group>
      )} */}
      {/* <Stack.Screen
          options={{
            headerTitle: 'Бүртгүүлэх',
            headerTitleAlign: 'center',
            headerLeft: () => <HeaderBack title="X" />,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            headerStyle: {
              backgroundColor: 'transparent',
            },
          }}
          name="signUp"
          component={Register}
        />
        <Stack.Screen
          options={{
            headerTitle: 'Бүртгүүлэх',
            headerTitleAlign: 'center',
            headerLeft: () => <HeaderBack title="X" />,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            // headerShown: false,
            headerStyle: {
              backgroundColor: 'transparent',
            },
          }}
          name="signUp1"
          component={RegisterUsername}
        /> */}
    </Stack.Navigator>
  );
};

export default Route;
