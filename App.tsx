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
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './i18n';
import { api } from './src/api';
import { axiosInstance } from './src/api/services/interceptors';
import { authStore } from './src/context/auth/store';
import { ModalProvider } from './src/context/modal/modal.context';
import Route from './src/routes/routes';

axiosInstance(api, authStore);
function App(): React.JSX.Element {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage('mn');
  }, []);


  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <NativeBaseProvider>
          <ModalProvider>
            <Route />
          </ModalProvider>
        </NativeBaseProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
export default App;
