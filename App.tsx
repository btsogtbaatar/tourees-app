import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import React, { useEffect } from 'react';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useTranslation } from 'react-i18next';
import { LogBox, Platform } from 'react-native';
import { Settings } from 'react-native-fbsdk-next';
import Geocoder from 'react-native-geocoding';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PushNotification from 'react-native-push-notification';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './i18n';
import { api } from './src/api';
import { axiosInstance } from './src/api/interceptors';
import store, { persistor } from './src/context/app/store';
import { ModalProvider } from './src/context/modal/modal.context';
import Route from './src/navigation';
import { RootStackParamList } from './src/navigation/types';

import Geolocation from '@react-native-community/geolocation';

persistor.subscribe(() => {
  axiosInstance(api);
});

if (__DEV__) {
  require('./ReactotronConfig');
}

export const navigationRef =
  React.createRef<NavigationContainerRef<RootStackParamList>>();

export function navigate(name: string, params: any) {
  navigationRef.current?.navigate(name, params);
}

function App(): React.JSX.Element {
  const { i18n } = useTranslation();

  PushNotification.checkPermissions(async ({ alert, badge, sound }) => {
    if (!alert || !badge || !sound) {
      await PushNotification.requestPermissions();
    }
  });
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

  useEffect(() => {
    Geocoder.init(process.env.GOOGLE_API_KEY!);
    Settings.setAppID(process.env.FACEBOOK_APP_ID!);
    Settings.initializeSDK();
    GoogleSignin.configure({
      webClientId: process.env.GOOGLE_WEB_CLIENT_ID,
      offlineAccess: true,
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      iosClientId: process.env.GOOGLE_IOS_CLIENT_ID,
    });

    // Ignore API call errors
    LogBox.ignoreLogs([/^Possible unhandled promise rejection/]);
    LogBox.ignoreLogs([
      /^no valid “aps-environment” entitlement string found for application/,
    ]);
    LogBox.ignoreLogs([
      'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
    ]);
    LogBox.ignoreLogs([
      'Non-serializable values were found in the navigation state',
    ]);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <NavigationContainer ref={navigationRef}>
              <ModalProvider>
                <Route />
              </ModalProvider>
            </NavigationContainer>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}
export default App;
