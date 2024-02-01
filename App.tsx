/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  NavigationContainer
} from '@react-navigation/native';
import React, { useEffect } from 'react';

import { NativeBaseProvider } from 'native-base';
import { useTranslation } from 'react-i18next';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './i18n';
import Route from './src/routes/routes';
import { api } from './src/api';
import { axiosInstance } from './src/api/services/interceptors';

axiosInstance(api);
function App(): React.JSX.Element {
  const { i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage('mn');
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <NativeBaseProvider>
          <Route />
        </NativeBaseProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
export default App;
