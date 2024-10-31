import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import * as encoding from 'text-encoding';
Object.assign(global, {
  TextEncoder: encoding.TextEncoder,
  TextDecoder: encoding.TextDecoder,
});
AppRegistry.registerComponent(appName, () => App);
