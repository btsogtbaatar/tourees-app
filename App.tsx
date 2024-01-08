/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { useTranslation } from 'react-i18next';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import './i18n';
import Route from './src/routes/routes';

function App(): React.JSX.Element {
  const { i18n } = useTranslation();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    i18n.changeLanguage('chn');
  }, []);

  return (
    <NavigationContainer>
      <Route />
    </NavigationContainer>
  );
}
export default App;
