/* eslint-disable react/no-unstable-nested-components */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Register from '../modules/Auth/Pages/Register/Register';
import HeaderBack from '../modules/Component/HeaderBack/HeaderBack';

const Stack = createNativeStackNavigator();

function Route() {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
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
      </Stack.Navigator>
    </>
  );
}

export default Route;
