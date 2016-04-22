/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';

import React, {
  AppRegistry,
  Component,
  View,
} from 'react-native';

var Index = require('./app/root');

class stephTest extends Component {
  render() {
    return (
      <Index/>
    );
  }
}

AppRegistry.registerComponent('stephTest', () => stephTest);
