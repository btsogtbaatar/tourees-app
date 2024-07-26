import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { LogBox } from 'react-native';
import Geocoder from 'react-native-geocoding';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './i18n';
import { api } from './src/api';
import { axiosInstance } from './src/api/interceptors';
import { authStore, languageStore } from './src/context/auth/store';
import { ModalProvider } from './src/context/modal/modal.context';
import Route from './src/navigation';

//social login imports
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Settings } from 'react-native-fbsdk-next';

axiosInstance(api, authStore);
function App(): React.JSX.Element {
  const { i18n } = useTranslation();
  languageStore(state => state);

  useEffect(() => {
    Geocoder.init(process.env.GOOGLE_API_KEY!);
    //Social init
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <ModalProvider>
            <Route />
          </ModalProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
export default App;
