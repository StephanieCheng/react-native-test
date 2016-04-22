/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';

import React, {
  Component,
  Text,
  View,
} from 'react-native';
import ExNavigator from '@exponent/react-native-navigator';
import {DATA} from './dummyData.js';

var Button = require('react-native-button');
var Router = require('./router.js');

class Root extends Component {
  render() {
    let page = DATA.pages[0];
    let post = DATA.posts[0];
    return (
      <ExNavigator
        initialRoute={Router.getHomeRoute()}
        // initialRoute={Router.getSessionRoute(page, post)}
        style={{ flex: 1 }}
        sceneStyle={{ paddingTop: 64 }}
      />
    );
  }
}

module.exports = Root;