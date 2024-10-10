import React, { useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import PushNotification, { Importance } from 'react-native-push-notification';
import store from '../../context/app/store';
import { setFirebaseToken } from '../../modules/Auth/slice/authSlice';
import {
  getNotificationList,
  getUnreadNotificationCount,
} from '../../modules/Notification/services/notification.service';
import {
  setNotifications,
  setUnreadNotificationCount,
} from '../../modules/Notification/slice/notificationSlice';

const checkApplicationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      console.debug('Permission granted');
    } catch (error) {
      console.error(error);
    }
  }
};

const RemoteNotification = () => {
  checkApplicationPermission();

  useEffect(() => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        store.dispatch(setFirebaseToken(token.token));
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification: any) {
        getNotificationList().then(res =>
          store.dispatch(setNotifications(res.content)),
        );

        getUnreadNotificationCount().then(res => {
          store.dispatch(setUnreadNotificationCount(res));
        });

        PushNotification.channelExists('default', function (exists) {
          if (!exists) {
            PushNotification.createChannel(
              {
                channelId: 'default', // (required)
                channelName: 'My channel', // (required)
                channelDescription:
                  'A channel to categorise your notifications', // (optional) default: undefined.
                playSound: false, // (optional) default: true
                soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
                importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
                vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
              },
              created => {
                PushNotification.localNotification({
                  timeoutAfter: 10000,
                  channelId: 'default', // (required for Android)
                  title: notification.title, // (optional)
                  ignoreInForeground: false,
                  message: notification.message, // (required)
                  playSound: true, // (optional) default: true
                  soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
                  importance: 'high', // (optional) set importance for Android notifications
                  vibrate: true, // (optional) default: true
                });
              }, // (optional) callback returns whether the channel was created, false means it already existed.
            );
          } else {
            PushNotification.localNotification({
              timeoutAfter: 10000,
              channelId: 'default', // (required for Android)
              title: notification.title, // (optional)
              ignoreInForeground: false,
              message: notification.message, // (required)
              playSound: true, // (optional) default: true
              soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
              importance: 'high', // (optional) set importance for Android notifications
              vibrate: true, // (optional) default: true
            });
          }
        });

        // process the notification

        // (required) Called when a remote is received or opened, or local notification is opened
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.debug('Action:', notification.action);
        console.debug('Notification:', notification);

        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      onRemoteFetch: function (notification) {
        console.debug('Remote fetch', notification);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
  }, []);

  return <></>;
};

export default RemoteNotification;
