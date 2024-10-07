import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import Notification from '../../../../components/Notification/Notification';
import { useAppDispatch } from '../../../../context/app/store';
import {
  getNotificationList,
  getUnreadNotificationCount,
  updateNotificationReadStatus,
} from '../../services/notification.service';
import { selectNotifications, setNotifications, setUnreadNotificationCount } from '../../slice/notificationSlice';
import { NotificationListStyle } from './NotificationList.style';

const NotificationList = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const notifications = useSelector(selectNotifications);

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = () => {
    setLoading(true);

    getNotificationList()
      .then(res => {
        dispatch(setNotifications(res.content));
      })
      .finally(() => {
        setLoading(false);
      });

    getUnreadNotificationCount().then(res => {
      dispatch(setUnreadNotificationCount(res));
    });
  };

  return (
    <View style={NotificationListStyle.container}>
      <FlatList
        data={notifications}
        refreshing={loading}
        onRefresh={getNotifications}
        renderItem={({ item }) => {
          return (
            <Notification
              key={item.id}
              title={item.title}
              subTitle={`${item.user.firstName} ${item.user.lastName} ${moment(item.createdDate).format('MMM DD hh:mm')}`}
              body={item.body}
              image={''}
              isRead={item.read}
              onPress={() => {
                updateNotificationReadStatus(item.id).then(() =>
                  getNotifications(),
                );
              }}
            />
          );
        }}
      />
    </View>
  );
};

export default NotificationList;
