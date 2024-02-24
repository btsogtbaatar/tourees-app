/* eslint-disable react/no-unstable-nested-components */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import moment from 'moment';
import React, { useEffect } from 'react';
import { authService } from '../api/services/auth';
import { authStore } from '../context/auth/store';
import { ClientTokenResponse } from '../context/entities';
import AuthStack from '../modules/Auth/Pages/Auth/routes';
import MainRouterStack from '../modules/Dashboard/Pages/routes/mainRoutes';
import DashboardMainStack from '../modules/Dashboard/routes';
import { MainStackParamList } from '../types/MainStackParamList';

const Stack = createNativeStackNavigator<MainStackParamList>();

const Route = () => {
  const isAuth = true;

  const token = authStore(state => state);

  useEffect(() => {
    authService.getClientCredentialToken().then((res: ClientTokenResponse) => {
      const access_token_date: Date = moment(new Date())
        .add(Number(res.expires_in), 'seconds')
        .toDate();

      res.access_token_expires = access_token_date;
      // token.clearClientToken();
      token.setClentToken(res);
    });
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name="DashboardStack" component={DashboardMainStack} />
        <Stack.Screen name="RequestStack" component={MainRouterStack} />
        <Stack.Screen name="AuthStack" component={AuthStack} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default Route;
