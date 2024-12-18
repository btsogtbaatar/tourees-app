import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PushNotification from 'react-native-push-notification';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Loading from './src/components/Loading/Loading';
import store, { persistor } from './src/context/app/store';
import { ModalProvider } from './src/context/modal/modal.context';
import Route from './src/navigation';

PushNotification.configure({
  onNotification: function (notification) {
    console.log('🚀 ~ notification:', notification);

    if (notification.userInteraction) {
      navigate(notification.data.path, notification.data.data);
    }
  },

  requestPermissions: false,
});

export const navigationRef = createNavigationContainerRef<any>();

export function navigate(name: string, params: string) {
  if (navigationRef.isReady()) navigationRef.navigate(name, JSON.parse(params));
}

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <GestureHandlerRootView>
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
