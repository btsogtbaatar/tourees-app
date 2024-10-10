import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import TaskListItem from '../../../../components/Requests/TaskListItem';
import { colors } from '../../../../theme/colors';
import { HomeStackParamList } from '../../../Home/navigation/types';
import { SharedModel } from '../../../Shared/entities/shared.model';
import { TaskModel } from '../../entities/request.model';
import { getMyTasks, getTasks } from '../../service/request.service';
import { TaskListStyle } from './TaskList.style';

type TaskListProps = NativeStackScreenProps<
  HomeStackParamList,
  'MyTasks' | 'BrowseTasks'
>;

const TaskList = (props: TaskListProps) => {
  const [requests, setRequests] = useState<TaskModel.TaskResponse[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [moreLoading, setMoreLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(0);
  const { t } = useTranslation();

  useEffect(() => {
    if (lastPage == 0 || lastPage >= currentPage) {
      getRequests();
    }
  }, [currentPage]);

  const getRequests = () => {
    var request =
      props.route.name === 'MyTasks'
        ? getMyTasks(currentPage)
        : getTasks(currentPage);

    request
      .then((res: SharedModel.Pagination<TaskModel.TaskResponse>) => {
        if (currentPage === 1) {
          setRequests(res.content);
        } else {
          setRequests([...requests, ...res.content]);
        }

        setLastPage(res.totalPages);
      })
      .finally(() => {
        setRefreshing(false);
        setMoreLoading(false);
      });
  };

  const onRefresh = () => {
    setRefreshing(true);

    if (currentPage === 1) {
      getRequests();
    } else {
      setCurrentPage(1);
    }
  };

  const fetchMore = () => {
    if (lastPage > currentPage) {
      setCurrentPage(currentPage + 1);
      setMoreLoading(true);
    }
  };

  const footerComponent = () => {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {moreLoading ? (
          <ActivityIndicator color={colors.primaryGradient} size="large" />
        ) : null}
        {lastPage <= currentPage && null}
      </View>
    );
  };
  
  const emptyComponent = () => {
    return (
      <View style={TaskListStyle.empty}>
        <Text>{t('emptyRequest')}</Text>
      </View>
    );
  };

  return (
    <CustomSafeAreaView>
      <ContainerView>
        <FlatList
          data={requests.filter(item => item.subCategory !== null)}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <TaskListItem task={item} />}
          ItemSeparatorComponent={() => (
            <View style={TaskListStyle.seperator} />
          )}
          onEndReached={fetchMore}
          onEndReachedThreshold={0.1}
          pagingEnabled={true}
          ListFooterComponent={footerComponent}
          refreshing={refreshing}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primaryGradient}
            />
          }
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={emptyComponent}
        />
      </ContainerView>
    </CustomSafeAreaView>
  );
};

export default TaskList;
