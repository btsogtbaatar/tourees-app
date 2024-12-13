import Geolocation from '@react-native-community/geolocation';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Platform } from 'react-native';
import { Settings } from 'react-native-fbsdk-next';
import Geocoder from 'react-native-geocoding';
import * as encoding from 'text-encoding';
import { api } from './src/api';
import { axiosInstance } from './src/api/interceptors';
import { persistor } from './src/context/app/store';

(() => {
  if (Platform.OS === 'ios') {
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
      authorizationLevel: 'whenInUse',
      enableBackgroundLocationUpdates: false,
      locationProvider: 'auto',
    });
  } else if (Platform.OS === 'android') {
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
      authorizationLevel: 'whenInUse',
      enableBackgroundLocationUpdates: false,
      locationProvider: 'playServices',
    });
  }

  Geocoder.init(process.env.GOOGLE_API_KEY!);
  Settings.setAppID(process.env.FACEBOOK_APP_ID!);
  Settings.initializeSDK();
  GoogleSignin.configure({
    webClientId: process.env.GOOGLE_WEB_CLIENT_ID,
    offlineAccess: true,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    iosClientId: process.env.GOOGLE_IOS_CLIENT_ID,
  });

  if (__DEV__) {
    require('./ReactotronConfig');
  }

  Object.assign(global, {
    TextEncoder: encoding.TextEncoder,
    TextDecoder: encoding.TextDecoder,
  });

  persistor.subscribe(() => {
    axiosInstance(api);
  });
})();
