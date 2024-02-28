import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { requestsService } from '../../../../../api/services';
import UserRequestCard from '../../../../Component/Requests/UserRequestCard';
import { RequestModule } from '../../../../../context/entities/request.model';
import { Colors } from '../../../../../../constants/Colors';

const Request = () => {
  const [requests, setRequests] = useState<RequestModule.Request[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [moreLoading, setMoreLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(0);
  useEffect(() => {
    if (lastPage == 0 || lastPage >= currentPage) getRequests();
  }, [currentPage]);

  const getRequests = () => {
    requestsService
      .getRequests(currentPage)
      .then((res: RequestModule.RequestResponse) => {
        if (currentPage === 1) {
          setRequests(res.data);
        } else setRequests([...requests, ...res.data]);
        setRefreshing(false);
        setLastPage(res.last_page);
        setMoreLoading(false);
      })
      .then(() => {
        setRefreshing(false);
      });
  };

  const onRefresh = () => {
    setRefreshing(true);
    setCurrentPage(1);
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
          <ActivityIndicator color={Colors.primaryColor} size="large" />
        ) : null}
        {lastPage <= currentPage && <Text>Өөр хүсэлт байхгүй байна</Text>}
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
            tintColor={Colors.primaryColor}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Request;
