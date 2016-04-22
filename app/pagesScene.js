'use strict';

import React, {
  StyleSheet,
  View,
} from 'react-native';

var YourRouter = require('./router.js');

class pagesScene extends React.Component {

  handlePress() {
    let route = YourRouter.getPostsRoute();
  }

  render() {
    return (
      <View />
    );
  }
}

const styles = StyleSheet.create({

});


module.exports = pagesScene;
