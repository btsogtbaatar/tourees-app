import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { DashboardStackParamList } from '../../../../types/DashboardStackParamList';
import Register from '../../../Auth/Pages/Auth/Register/Register';
import HeaderBack from '../../../Component/HeaderBack/HeaderBack';
import Requests from '../Home/Request/Requests/Requests';
import { Colors } from '../../../../../constants/Colors';
import UserRequest from '../Home/Request/UserRequest/UserRequest';
import LinearGradient from 'react-native-linear-gradient';
import { horizontalScale } from '../../../../uitls/metrics';
import { Text, View } from 'react-native';

const Stack = createNativeStackNavigator<DashboardStackParamList>();

const MainRouterStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={({ route }: any) => {
          return {
            headerShown: true,
            headerLeft: () => <HeaderBack />,
            headerTitle: route.params.title,
            headerTitleStyle: {
              fontSize: 16,
              fontWeight: '700',
              color: Colors.textHeader,
            },
            headerStyle: {
              backgroundColor: 'transparent',
            },
          };
        }}
        name="RequestList"
        component={Requests}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerBackground: () => {
            return (
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                locations={[0, 1]}
                colors={['#37414B', '#161A1E']}
                style={{ flex: 1 }}
              />
            );
          },
          headerTitle: '',
          headerLeft: () => <HeaderBack color={Colors.textWhite} />,
        }}
        name="UserRequest"
        component={UserRequest}
      />
    </Stack.Navigator>
  );
};

export default MainRouterStack;
