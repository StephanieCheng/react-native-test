'use strict';

import React, {
  Alert,
  Image,
  ListView,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';
import {DATA} from './dummyData.js';


var Router = require('./router.js');


class PostsScene extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      page:  this.props.page,
      posts: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  }

  componentDidMount() {
    this.fetchPostsJson();
  }

  fetchPostsJson() {
    var dummyPosts = DATA.posts;
    this.setTimeout(function() {
      this.setState({
        isLoading: false,
        posts: this.state.posts.cloneWithRows(dummyPosts),
      });
    }, 500);
  }

  onPress(page, post) {
    Alert.alert(
      'Start Prompter',
      post.postDetails,
      [
        {text: 'Cancel'},
        {text: 'Start', onPress: () => {
          // Start session
          let route = Router.getSessionRoute(page, post);
          this.props.navigator.push(route);
        }},
      ]
    );
  }

  render() {
    var {isLoading} = this.state;

    if(isLoading) {
      return this.renderLoading();
    } else {
      return this.renderPosts();
    }
  }

  renderLoading() {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    );
  }

  renderPosts() {
    return (
      <ListView
        dataSource={this.state.posts}
        renderRow={this.renderRow.bind(this)}
        style={styles.container} />
    );
  }

  renderRow(post) {
    return (
      <TouchableHighlight
        activeOpacity={0.5}
        underlayColor={'white'}
        onPress={this.onPress.bind(this, this.state.page, post)}>

        <View style={styles.rowContainer}>
          <Image source={{uri: post.pageAvatarUrl}} style={styles.avatar} />
          <View style={styles.rightContainer}>
            <Text>{post.postDetails}</Text>
          </View>
        </View>

      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  container: {
    paddingVertical: 15,
  },
  rightContainer: {
    flex: 1,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  subtitle: {
    color: '#666',
    fontSize: 12,
  },
});

reactMixin(PostsScene.prototype, TimerMixin);
module.exports = PostsScene;
