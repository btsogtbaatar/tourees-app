import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HeaderBar from '../components/HeaderBack/HeaderBar';
import AuthStack from '../modules/auth/navigation';
import HomeStack from '../modules/home/navigation';
import RequestStack from '../modules/request/navigation';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Route = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="HomeStack">
      <Stack.Group>
        <Stack.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            header: () => <HeaderBar isDashboard={true} />,
          }}
        />
        <Stack.Screen name="RequestStack" component={RequestStack} />
        <Stack.Screen name="AuthStack" component={AuthStack} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default Route;
