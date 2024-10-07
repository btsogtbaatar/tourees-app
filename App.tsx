import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useTranslation } from 'react-i18next';
import { LogBox } from 'react-native';
import { Settings } from 'react-native-fbsdk-next';
import Geocoder from 'react-native-geocoding';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Keychain from 'react-native-keychain';
import PushNotification from 'react-native-push-notification';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './i18n';
import { api } from './src/api';
import { axiosInstance } from './src/api/interceptors';
import RemoteNotification from './src/components/RemoteNotification/RemoteNotification';
import store, { persistor } from './src/context/app/store';
import { ModalProvider } from './src/context/modal/modal.context';
import Route from './src/navigation';

persistor.subscribe(() => {
  axiosInstance(api);
});

if (__DEV__) {
  require('./ReactotronConfig');
}

function App(): React.JSX.Element {
  const { i18n } = useTranslation();

  PushNotification.checkPermissions(async ({ alert, badge, sound }) => {
    console.log(
      '🚀 ~ PushNotification.checkPermissions ~ !alert || !badge || !sound:',
      !alert || !badge || !sound,
    );
    if (!alert || !badge || !sound) {
      await PushNotification.requestPermissions();
    }
  });

  useEffect(() => {
    Keychain.resetGenericPassword().then(() => {
      console.log('Successfully reset');
    });

    Geocoder.init(process.env.GOOGLE_API_KEY!);
    Settings.setAppID(process.env.FACEBOOK_APP_ID!);
    Settings.initializeSDK();
    GoogleSignin.configure({
      webClientId: process.env.GOOGLE_WEB_CLIENT_ID,
      offlineAccess: true,
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      iosClientId: process.env.GOOGLE_IOS_CLIENT_ID,
    });

    i18n.changeLanguage('en');
    LogBox.ignoreLogs([
      'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
    ]);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RemoteNotification />  
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <NavigationContainer>
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
