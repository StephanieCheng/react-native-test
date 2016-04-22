'use strict';

import React, {
  Component,
  Image,
  Text,
  View,
} from 'react-native';

var Button = require('react-native-button');

let YourRouter = {

  getHomeRoute() {
    return {
      getSceneClass() {
        return require('./homeScene');
      },
      // onDidFocus(event) {
      //   console.log('Home Scene received focus.');
      // },
      getTitle() {
        return 'Home';
      },
      // renderTitle() {
      //   return (
      //       <View style={styles.container}>
      //         <Text>Home</Text>
      //       </View>
      //   );
      // },
    }
  },

  getPostsRoute(page) {
    return {
      getTitle() {
        return 'Posts';//page.name;
      },
      // onDidFocus(event) {
      //   console.log('Posts Scene received focus.');
      // },
      renderScene(navigator) {
        let PostsScene = require('./postsScene');
        return <PostsScene navigator={navigator} page={page} />;
      },
      renderTitle() {
        return (
          <View style={styles.container}>
            <Text>{page.name} Posts</Text>
          </View>
        );
      },
      renderRightButton() {
        return (
          <Button onPress={() => {console.log('Tapped right buttons'); }}>
          </Button>
        );
      },
    };
  },

  getSessionRoute(page, post) {
    return {
      getTitle() {
        return page.name;
      },
      renderScene(navigator) {
        let SessionScene = require('./sessionScene');
        return <SessionScene navigator={navigator} page={page} post={post} />;
      },
      // renderTitle() {
      //   return (
      //     <View />
      //   );
      // },
      renderRightButton() {
        return (
          <Button onPress={() => {console.log('Tapped right buttons'); }}>
          </Button>
        );
      },
    };
  }
};


var styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleName: {
    marginLeft: 5,
    fontWeight: 'bold'
  },
  titlePhoto: {
    height: 30,
    width: 30,
    borderRadius: 15,
  }
};


module.exports = YourRouter;
