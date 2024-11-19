import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import Notification from '../../../../components/Notification/Notification';
import { useAppDispatch } from '../../../../context/app/store';
import { colors } from '../../../../theme';
import {
  getNotificationList,
  getUnreadNotificationCount,
  updateNotificationReadStatus,
} from '../../services/notification.service';
import {
  selectNotifications,
  setNotifications,
  setUnreadNotificationCount,
} from '../../slice/notificationSlice';
import { NotificationListStyle } from './NotificationList.style';

const Empty = () => {
  const { t } = useTranslation();
  return (
    <ContainerView style={NotificationListStyle.emptyContainer}>
      <Text style={NotificationListStyle.emptyText}>
        {t('notification.notFound')}
      </Text>
    </ContainerView>
  );
};

const NotificationList = () => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useAppDispatch();
  const notifications = useSelector(selectNotifications);
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(0);
  const [moreLoading, setMoreLoading] = useState<boolean>(false);

  useEffect(() => {
    if (lastPage == 0 || lastPage >= currentPage) {
      getNotifications();
    }
  }, [currentPage]);

  const getNotifications = () => {
    setRefreshing(true);

    getNotificationList(currentPage)
      .then(res => {
        if (currentPage === 1) {
          dispatch(setNotifications(res.content));
        } else {
          dispatch(setNotifications([...notifications, ...res.content]));
        }

        setLastPage(res.totalPages);
      })
      .finally(() => {
        setRefreshing(false);
        setMoreLoading(false);
      });

    getUnreadNotificationCount().then(res => {
      dispatch(setUnreadNotificationCount(res));
    });
  };

  const onRefresh = () => {
    setRefreshing(true);

    if (currentPage === 1) {
      getNotifications();
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
      <View style={NotificationListStyle.footerContainer}>
        {moreLoading ? (
          <ActivityIndicator color={colors.primaryGradient} size="large" />
        ) : null}
      </View>
    );
  };

  return (
    <SafeAreaView style={NotificationListStyle.container}>
      <FlatList
        data={notifications}
        keyExtractor={(notification, index) => notification.id.toString()}
        refreshing={refreshing}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={footerComponent}
        onRefresh={onRefresh}
        ListEmptyComponent={() => <Empty />}
        renderItem={({ item }) => {
          return (
            <Notification
              title={item.title}
              subTitle={`${item.user.firstName} ${item.user.lastName} ${moment(item.createdDate).format('MMM DD hh:mm')}`}
              body={item.body}
              image={item.user.profilePicture?.url}
              isRead={item.read}
              onPress={() => {
                updateNotificationReadStatus(item.id).then(() => {
                  getNotifications();
                  navigation.navigate(item.path, JSON.parse(item.data));
                });
              }}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default NotificationList;
