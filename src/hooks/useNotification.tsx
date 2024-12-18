import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { useSelector } from 'react-redux';
import store from '../context/app/store';
import { selectAuthenticated } from '../modules/Auth/slice/authSlice';
import {
  getNotificationList,
  getUnreadNotificationCount,
} from '../modules/Notification/services/notification.service';
import {
  setNotifications,
  setUnreadNotificationCount,
} from '../modules/Notification/slice/notificationSlice';
import { toastError } from '../utilities/toast';
import { useTaskerServiceFetch } from './useTaskerServiceFetch';

export const refreshNotifications = () => {
  getNotificationList(1).then(res =>
    store.dispatch(setNotifications(res.content)),
  );

  getUnreadNotificationCount().then(res => {
    store.dispatch(setUnreadNotificationCount(res));
  });
};

// TODO: Fix duplicated subscription
function useNotification() {
  const isAuthenticated = useSelector(selectAuthenticated);
  const { createdTaskerServices } = useTaskerServiceFetch();
  const [permisionGranted, setPermisionGranted] = useState(false);

  const channelId = 'default';
  const channelName = 'Default channel';

  const createChannelIfNotExists = () => {
    PushNotification.channelExists(channelId, exists => {
      if (!exists) {
        PushNotification.createChannel(
          {
            channelId: channelId,
            channelName: channelName,
          },
          created => {},
        );
      }
    });
  };

  const localNotification = (message: FirebaseMessagingTypes.RemoteMessage) => {
    PushNotification.localNotification({
      /* Android only properties */
      channelId: channelId,

      /* iOS only properties */
      title: message.notification?.title,
      message: message.notification!.body!,
      soundName: 'default',
      playSound: true,
      userInfo: message.data,

      /* Other properties */
      allowWhileIdle: true,
      priority: 'high',
    });
  };

  const requirePermission = () => {
    if (Platform.OS === 'ios') {
      messaging()
        .requestPermission()
        .then(authStatus => {
          const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

          if (!enabled) {
            toastError(t('locationPermissionDenied'));
          } else {
            setPermisionGranted(true);
          }
        });
    } else if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      ).then(granted => {
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          toastError(t('locationPermissionDenied'));
        } else {
          setPermisionGranted(true);
        }
      });
    } else {
      // Unsupported platform
      toastError(t('notSupportedPlatform'));
    }
  };

  useEffect(() => {
    createChannelIfNotExists();

    if (!permisionGranted) {
      requirePermission();
    }

    const topics: string[] = [];
    let unsubscribeMessage = null;

    if (createdTaskerServices && isAuthenticated && permisionGranted) {
      refreshNotifications();

      unsubscribeMessage = messaging().onMessage(message => {
        console.log('🚀 ~ onMessaging ~ message:', message);
        localNotification(message);
        refreshNotifications();
      });

      const subCategoryIds = [
        ...new Set(createdTaskerServices?.map(x => x.subCategory.id)),
      ];

      subCategoryIds?.forEach(id => {
        const topic = `topics-task-services-sub-categories-${id}`;

        messaging()
          .subscribeToTopic(topic)
          .then(() => {
            console.log(`Subscribed to ${topic} topic!`);
            topics.push(topic);
          });
      });
    }

    return () => {
      topics.forEach(topic => {
        console.log(`Unsubscribed from ${topic} topic!`);
        messaging().unsubscribeFromTopic(topic);
      });
      unsubscribeMessage && unsubscribeMessage();
    };
  }, [createdTaskerServices, isAuthenticated, permisionGranted]);

  return null;
}

export default useNotification;
