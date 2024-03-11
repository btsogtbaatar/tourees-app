/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';

import { NativeBaseProvider } from 'native-base';
import { useTranslation } from 'react-i18next';
import { LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './i18n';
import { api } from './src/api';
import { axiosInstance } from './src/api/services/interceptors';
import { authStore, languageStore } from './src/context/auth/store';
import { ModalProvider } from './src/context/modal/modal.context';
import Route from './src/routes/routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Geocoder from 'react-native-geocoding';

axiosInstance(api, authStore);
function App(): React.JSX.Element {
  const { i18n } = useTranslation();
  const languageState = languageStore(state => state);

  useEffect(() => {
    Geocoder.init(process.env.GOOGLE_API_KEY!);
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
