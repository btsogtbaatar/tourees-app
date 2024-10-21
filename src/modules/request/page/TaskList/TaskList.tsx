import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import TaskListItem from '../../../../components/Requests/TaskListItem';
import { RootStackParamList } from '../../../../navigation/types';
import { colors } from '../../../../theme/colors';
import { horizontalScale } from '../../../../utilities';
import { HomeStackParamList } from '../../../Home/navigation/types';
import { SharedModel } from '../../../Shared/entities/shared.model';
import { TaskModel } from '../../entities/request.model';
import {
  getMyOfferTasks,
  getMyTasks,
  getTasks,
} from '../../service/request.service';
import { TaskListStyle } from './TaskList.style';

type BrowseTasksProps = NativeStackScreenProps<
  HomeStackParamList,
  'MyTasks' | 'BrowseTasks'
>;

type MyOfferTasksProps = NativeStackScreenProps<
  RootStackParamList,
  'MyOfferTasks'
>;

const TaskList = (props: BrowseTasksProps | MyOfferTasksProps) => {
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
    setRefreshing(true);

    let request;

    if (props.route.name === 'BrowseTasks') {
      request = getTasks(currentPage);
    } else if (props.route.name === 'MyTasks') {
      request = getMyTasks(currentPage);
    } else if (props.route.name === 'MyOfferTasks') {
      request = getMyOfferTasks(currentPage);
    }

    if (request) {
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
    }
  };

  const onRefresh = () => {
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
        <Text>{refreshing ? t('loading') : t('emptyRequest')}</Text>
      </View>
    );
  };

  return (
    <CustomSafeAreaView>
      <FlatList
        data={requests.filter(item => item.subCategory !== null)}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <TaskListItem task={item} />}
        ItemSeparatorComponent={() => <View style={TaskListStyle.seperator} />}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={footerComponent}
        refreshing={refreshing}
        onRefresh={onRefresh}
        contentContainerStyle={{ flexGrow: 1, padding: horizontalScale(16) }}
        showsVerticalScrollIndicator={true}
        ListEmptyComponent={emptyComponent}
      />
    </CustomSafeAreaView>
  );
};

export default TaskList;
