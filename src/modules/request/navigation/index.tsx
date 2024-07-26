import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import HeaderBack from '../../../components/HeaderBack/HeaderBack';

import HeaderBar from '../../../components/HeaderBack/HeaderBar';
import HeaderRequest from '../../../components/HeaderBack/HeaderRequest';
import { colors } from '../../../constants/colors';
import RequestDetail from '../page/RequestDetail/RequestDetail';
import SubCategoryList from '../page/SubCategoryList/SubCategoryList';
import UserRequest from '../page/UserRequest/UserRequest';
import { RequestStackParamList } from './types';

const Stack = createNativeStackNavigator<RequestStackParamList>();

const RequestStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={({ route }: any) => {
          return {
            header: () => <HeaderBar title={route.params.title} />,
          };
        }}
        name="SubCategoryList"
        component={SubCategoryList}
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
          headerLeft: () => <HeaderBack color={colors.white} />,
        }}
        name="UserRequest"
        component={UserRequest}
      />
      <Stack.Screen
        options={({ route }: any) => {
          return {
            header: () => (
              <HeaderRequest
                title={route.params.title}
                url={route.params.url}
              />
            ),
          };
        }}
        name="RequestDetail"
        component={RequestDetail}
      />
    </Stack.Navigator>
  );
};

export default RequestStack;
