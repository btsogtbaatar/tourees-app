import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox } from 'react-native';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

export const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: 'Tourees Demo',
    // host: '192.168.1.69',
  }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(reactotronRedux())
  .connect(); // let's connect!

// Ignore API call errors
LogBox.ignoreLogs([
  /^Possible unhandled promise rejection/,
  /^no valid “aps-environment” entitlement string found for application/,
  'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
  'Non-serializable values were found in the navigation state',
  'MapViewDirections Error: Error on GMAPS route request: ZERO_RESULTS',
]);
