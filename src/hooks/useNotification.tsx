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
  return null;
}

export default useNotification;
