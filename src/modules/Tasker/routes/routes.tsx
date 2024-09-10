import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { TaskerParamList } from '../../../navigation/types';
import customScreenOption from '../../../theme/customHeaderOption';
import RegisterTasker from '../page/RegisterTasker/RegisterTasker';
import { useTranslation } from 'react-i18next';

const Stack = createNativeStackNavigator<TaskerParamList>();

const TaskerStack = () => {
  const { t } = useTranslation();
  return (
    <Stack.Navigator
      initialRouteName="RegisterTasker"
      screenOptions={customScreenOption}>
      <Stack.Group>
        <Stack.Screen
          name="RegisterTasker"
          component={RegisterTasker}
          options={{ title: t('headers.request') }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default TaskerStack;
