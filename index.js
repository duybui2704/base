/**
 * @format
 */
import {AppRegistry} from 'react-native';

import App from './src/routers/Router';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
