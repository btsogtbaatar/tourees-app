import { AppRegistry } from 'react-native';
import * as encoding from 'text-encoding';
import App from './App';
import { name as appName } from './app.json';
import "./notification";

Object.assign(global, {
  TextEncoder: encoding.TextEncoder,
  TextDecoder: encoding.TextDecoder,
});

AppRegistry.registerComponent(appName, () => App);
