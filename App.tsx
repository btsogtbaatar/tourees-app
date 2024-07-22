import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';

import { NativeBaseProvider } from 'native-base';
import { useTranslation } from 'react-i18next';
import { LogBox } from 'react-native';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './i18n';
import { api } from './src/api';
import { axiosInstance } from './src/api/interceptors';
import { authStore, languageStore } from './src/context/auth/store';
import { ModalProvider } from './src/context/modal/modal.context';
import Route from './src/navigation';

import { Settings } from 'react-native-fbsdk-next';

navigator.geolocation = require('react-native-geolocation-service');
axiosInstance(api, authStore);
function App(): React.JSX.Element {
  // TODO: How to request geo location permission on Android devices
  Geolocation.requestAuthorization('whenInUse')
    .then(success => console.log(success))
    .then(error => console.log(error));

  Geolocation.getCurrentPosition(
    position => {
      console.log(position);
    },
    error => {
      // See error code charts below.
      console.log(error.code, error.message);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
  );

  const { i18n } = useTranslation();
  const languageState = languageStore(state => state);

  useEffect(() => {
    Geocoder.init(process.env.GOOGLE_API_KEY!);
    Settings.setAppID(process.env.FACEBOOK_APP_ID!);
    Settings.initializeSDK();
    i18n.changeLanguage(languageState.language ? languageState.language : 'mn');
    LogBox.ignoreLogs([
      'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
    ]);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <NativeBaseProvider>
            <ModalProvider>
              <Route />
            </ModalProvider>
          </NativeBaseProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
export default App;
