import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import CustomGradientButton from '../../../../components/CustomButton/CustomGradientButton';
import CustomCurrencyInput from '../../../../components/CustomInput/CustomCurrencyInput';
import CustomKeyboardAvoidingView from '../../../../components/CustomKeyboardAvoidingView/CustomKeyboardAvoidingView';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import { notifyMessage } from '../../../../components/CustomToast/CustomToast';
import { RootStackParamList } from '../../../../navigation/types';
import { createTask } from '../../service/request.service';
import { TaskBudgetStyle } from './TaskBudget.style';

type TaskBudgetProps = NativeStackScreenProps<RootStackParamList, 'TaskBudget'>;

const TaskBudget = (props: TaskBudgetProps) => {
  const { task } = props.route.params;
  const { t } = useTranslation();
  const rootNavigation = useNavigation();
  const [value, setValue] = useState<number | null>(0);

  const onSubmit = () => {
    task.budget = value!;

    createTask(task).then(() => {
      rootNavigation.navigate('HomeTab', { screen: 'Home' });

      notifyMessage(
        t('userRequest.success.title'),
        t('userRequest.success.message'),
      );
    });
  };

  return (
    <CustomKeyboardAvoidingView>
      <CustomSafeAreaView>
        <ContainerView>
          <Text style={TaskBudgetStyle.instruction}>
            {t('userRequest.enterBudget')}
          </Text>
          <View style={TaskBudgetStyle.innerContainer}>
            <CustomCurrencyInput value={value} onChangeValue={setValue} />
          </View>
          <View style={{ width: '100%' }}>
            <CustomGradientButton
              disabled={value === 0 || value === null}
              title={t('taskBudget.submit')}
              onPress={onSubmit}
            />
          </View>
        </ContainerView>
      </CustomSafeAreaView>
    </CustomKeyboardAvoidingView>
  );
};

export default TaskBudget;
