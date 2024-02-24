import React, { useEffect, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import { Colors } from '../../../../../../constants/Colors';
import { requestsService } from '../../../../../api/services';
import { horizontalScale, verticalScale } from '../../../../../uitls/metrics';
import UserRequestCard from '../../../../Component/Requests/UserRequestCard';

const Request = () => {
  const [requests, setRequests] = useState<any[]>();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  useEffect(() => {
    getRequests();
  }, []);

  const getRequests = () => {
    requestsService
      .getRequests()
      .then((res: any[]) => {
        setRequests(res);
        setRefreshing(false);
      })
      .then(() => {
        setRefreshing(false);
      });
  };

  const onRefresh = () => {
    setRefreshing(true);
    getRequests();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{
          paddingHorizontal: horizontalScale(16),
          paddingTop: verticalScale(12),
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            tintColor={Colors.primaryColor}
            onRefresh={onRefresh}
          />
        }>
        <FlatList
          data={requests}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <UserRequestCard item={item} />}
          ItemSeparatorComponent={() => <View style={{ marginTop: 12 }} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Request;
