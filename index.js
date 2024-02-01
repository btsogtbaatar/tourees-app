/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import * as LogConfig from './src/helpers/LogConfig'

LogConfig.configure({enableLog: false});

AppRegistry.registerComponent(appName, () => App);
