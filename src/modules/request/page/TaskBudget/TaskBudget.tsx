import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import CustomGradientButton from '../../../../components/CustomButton/CustomGradientButton';
import CustomCurrencyInput from '../../../../components/CustomInput/CustomCurrencyInput';
import CustomKeyboardAvoidingView from '../../../../components/CustomKeyboardAvoidingView/CustomKeyboardAvoidingView';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import { notifyMessage } from '../../../../components/CustomToast/CustomToast';
import { useAppDispatch } from '../../../../context/app/store';
import { RootStackParamList } from '../../../../navigation/types';
import { selectAuthenticated } from '../../../Auth/slice/authSlice';
import { createTask } from '../../service/request.service';
import { saveDraft } from '../../slice/taskSlice';
import { TaskBudgetStyle } from './TaskBudget.style';

type TaskBudgetProps = NativeStackScreenProps<RootStackParamList, 'TaskBudget'>;

const TaskBudget = (props: TaskBudgetProps) => {
  const { task } = props.route.params;
  const { t } = useTranslation();
  const rootNavigation = useNavigation();
  const isAuthenticated = useSelector(selectAuthenticated);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<number | null>(0);

  const onSubmit = () => {
    task.budget = value!;

    if (isAuthenticated) {
      createTask(task).then(() => {
        notifyMessage(
          t('userRequest.success.title'),
          t('userRequest.success.message'),
        );
        rootNavigation.navigate('HomeTab', { screen: 'Home' });
      });
    } else {
      dispatch(saveDraft(task));
      rootNavigation.navigate('Login');
    }
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
