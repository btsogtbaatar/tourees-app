import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import RemarkListView from '../../../components/RemarkListView/RemarkListView';
import { TaskerParamList } from '../../../navigation/types';
import customScreenOption from '../../../theme/customHeaderOption';
import RegisterTasker from '../page/RegisterTasker/RegisterTasker';
import TaskerView from '../page/TaskerView/TaskerView';

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
          options={{ title: t('headers.taskerProfile') }}
        />
        <Stack.Screen
          name="TaskerView"
          component={TaskerView}
          options={{ title: t('headers.taskerProfile') }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="RemarkListView"
          component={RemarkListView}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default TaskerStack;
