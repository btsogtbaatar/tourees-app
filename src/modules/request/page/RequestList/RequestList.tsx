import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import UserRequestCard from '../../../../components/Requests/UserRequestCard';
import { colors } from '../../../../constants/colors';
import { SharedModel } from '../../../shared/entities/shared.model';
import { TaskModel } from '../../entities/request.model';
import { getTasks } from '../../service/request.service';

const Request = () => {
  const [requests, setRequests] = useState<TaskModel.TaskResponse[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [moreLoading, setMoreLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(0);
  useEffect(() => {
    if (lastPage == 0 || lastPage >= currentPage) {
      getRequests();
    }
  }, [currentPage]);
  const { t } = useTranslation();

  const getRequests = () => {
    getTasks(currentPage)
      .then((res: SharedModel.Pagination<TaskModel.TaskResponse>) => {
        if (currentPage === 1) {
          setRequests(res.content);
        } else {
          setRequests([...requests, ...res.content]);
        }
        setRefreshing(false);
        setLastPage(res.totalPages);
        setMoreLoading(false);
      })
      .then(() => {
        setRefreshing(false);
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
          <ActivityIndicator color={colors.primaryColor} size="large" />
        ) : null}
        {lastPage <= currentPage && null}
      </View>
    );
  };
  const emptyComponent = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>{t('emptyRequest')}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 16 }}>
      <FlatList
        data={requests}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <UserRequestCard item={item} />}
        ItemSeparatorComponent={() => <View style={{ marginTop: 12 }} />}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.1}
        pagingEnabled={true}
        ListFooterComponent={footerComponent}
        refreshing={refreshing}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primaryColor}
          />
        }
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={emptyComponent}
      />
    </SafeAreaView>
  );
};

export default Request;
