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
  const languageState = languageStore(state => state);

  useEffect(() => {
    Geocoder.init(process.env.GOOGLE_API_KEY!);
    //Social init
    Settings.setAppID(process.env.FACEBOOK_APP_ID!);
    Settings.initializeSDK();
    GoogleSignin.configure({
      webClientId:
        '949997873563-u4jnhf8j4t5sm6f2skqraat89qgfn7ov.apps.googleusercontent.com',
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      iosClientId:
        '949997873563-cg09eqnu59uk4leoo2iak61kuelk7h8m.apps.googleusercontent.com',
    });

    i18n.changeLanguage('en');
    // i18n.changeLanguage(languageState.language ? languageState.language : 'mn');
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
