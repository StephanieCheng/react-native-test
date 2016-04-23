'use strict';

import React, {
  AlertIOS,
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

// Potential swipe libs
import {SwipeListView} from 'react-native-swipe-list-view';
var Swipeout = require('react-native-swipeout');

// Custom Tab Bar
import FacebookTabBar from './FacebookTabBar';
var ScrollableTabView = require('react-native-scrollable-tab-view');

// Infinite Scroll
var InfiniteScrollView = require('react-native-infinite-scroll-view');

// Router
var Router = require('./router.js');

class sessionScene extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      page: this.props.page,
      post: this.props.post,
      comments: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      suggestedComments: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  }

  componentWillMount() {
    this.fetchCommentsJson();
    // this.fetchSuggestedCommentsJson();
  }

  fetchCommentsJson() {
    var dummyComments = DATA.comments;
    var dummySuggestedComments = DATA.suggestedComments;
    this.setTimeout(function() {
      this.setState({
        isLoading: false,
        comments: this.state.comments.cloneWithRows(dummyComments),
        suggestedComments: this.state.suggestedComments.cloneWithRows(dummySuggestedComments)
      });
    }, 500);
  }

  handleLeftPress(data) {
    console.log('handling left press', data.id);
  }

  loadMore() {
    AlertIOS.alert('Loading more!');
    // console.log('')
  }

  render() {
    var {isLoading} = this.state;

    if(isLoading) {
      return this.renderLoading();
    } else {
      return this.renderSession();
    }
  };

  renderLoading() {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    );
  }

  renderRow(comment) {
    return (
      <View style={styles.rowContainer}>
        <Image source={{uri: comment.profile_image_url}} style={styles.avatar} />
        <View style={styles.rightContainer}>
          <Text>{comment.tweettext}</Text>
        </View>
      </View>
    );

    // Swipeout
    // var swipeoutBtns = [
    //   {text: 'SUGGEST'},
    //   {text: 'REMOVE'},
    // ];
    // return (
    //   <Swipeout right={swipeoutBtns}>
    //     <View style={styles.rowContainer}>
    //       <Image source={{uri: comment.profile_image_url}} style={styles.avatar} />
    //       <View style={styles.rightContainer}>
    //         <Text>{comment.tweettext}</Text>
    //       </View>
    //     </View>
    //   </Swipeout>
    // );
  }

  renderSession() {
    // 1. Default single list view
    // return (
    //   <ListView
    //     dataSource={this.state.comments}
    //     renderRow={this.renderRow.bind(this)}
    //     style={styles.container} />
    // );

    // 2. SwipeListView: single list, no tabs
    // return(
    //   <SwipeListView
    //     dataSource={this.state.comments}
    //     renderRow={this.renderRow.bind(this)}
    //     renderHiddenRow={ data => (
    //         <View style={styles.rowBack}>
    //             <Text style={styles.rowButtonLeft}>Left</Text>
    //             <Text style={styles.rowButtonRight}>Right1</Text>
    //             <Text style={styles.rowButtonRight}>Right2</Text>
    //         </View>
    //     )}
    //     leftOpenValue={100}
    //     rightOpenValue={-200}
    //     style={styles.container} />
    // );

    // 3. Scrollable with swipe list view
    return (
      <ScrollableTabView
        locked='true'
        tabBarTextStyle={styles.tabText}
        tabBarActiveTextColor='#5890FF'
        tabBarUnderlineColor='#5890FF'
        tabBarInactiveTextColor='#BFBFBF'>
        <SwipeListView
          tabLabel="SUGGESTED"
          dataSource={this.state.suggestedComments}
          renderRow={this.renderRow.bind(this)}
          renderHiddenRow={ data => (
            <View style={styles.rowBack}>
              <Text
                style={[styles.button, styles.buttonLeft]}
                onPress={this.handleLeftPress.bind(this, data)}>
                Left
              </Text>
              <Text style={[styles.button, styles.buttonRight]}>Right1</Text>
              <Text style={[styles.button, styles.buttonRight]}>Right2</Text>
            </View>
          )}
          leftOpenValue={100}
          rightOpenValue={-200}
          style={styles.container} />
        <SwipeListView
          tabLabel="ALL"

          // Infinite scroll
          renderScrollComponent={props => <InfiniteScrollView {...props} />}
          onLoadMoreAsync={this.loadMore.bind(this)}
          canLoadMore={true}
          distanceToLoadMore={10}

          dataSource={this.state.comments}
          renderRow={this.renderRow.bind(this)}
          renderHiddenRow={ data => (
            <View style={styles.rowBack}>
              <Text style={[styles.button, styles.buttonLeft]}>Left</Text>
              <Text style={[styles.button, styles.buttonRight]}>Right1</Text>
              <Text style={[styles.button, styles.buttonRight]}>Right2</Text>
            </View>
          )}
          leftOpenValue={100}
          rightOpenValue={-200}
          style={styles.container} />
      </ScrollableTabView>
    );

    // 4. Scrollable with swipe list view and custom toolbar
    // return (
    //   <ScrollableTabView
    //     locked='true'
    //     renderTabBar={() => <FacebookTabBar />}>
    //     <SwipeListView
    //       tabLabel="person-stalker"
    //       dataSource={this.state.suggestedComments}
    //       renderRow={this.renderRow.bind(this)}
    //       renderHiddenRow={ data => (
    //         <View style={styles.rowBack}>
    //           <Text
    //             style={[styles.button, styles.buttonLeft]}
    //             onPress={this.handleLeftPress.bind(this)}>
    //             Left
    //           </Text>
    //           <Text style={[styles.button, styles.buttonRight]}>Right1</Text>
    //           <Text style={[styles.button, styles.buttonRight]}>Right2</Text>
    //         </View>
    //       )}
    //       leftOpenValue={100}
    //       rightOpenValue={-200}
    //       style={styles.container} />
    //     <SwipeListView
    //       tabLabel="ios-world"
    //       dataSource={this.state.comments}
    //       renderRow={this.renderRow.bind(this)}
    //       renderHiddenRow={ data => (
    //         <View style={styles.rowBack}>
    //           <Text style={[styles.button, styles.buttonLeft]}>Left</Text>
    //           <Text style={[styles.button, styles.buttonRight]}>Right1</Text>
    //           <Text style={[styles.button, styles.buttonRight]}>Right2</Text>
    //         </View>
    //       )}
    //       leftOpenValue={100}
    //       rightOpenValue={-200}
    //       style={styles.container} />
    //   </ScrollableTabView>
    // );
  }

  renderTabs() {
    return (
      <View>
        <Text>SUGGESTED</Text>
        <Text>ALL</Text>
      </View>
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
  button: {
    flex: 1,
    fontSize: 18,
    fontWeight: '300',

  },
  buttonLeft: {
    textAlign: 'left',
    paddingLeft: 15,
  },
  buttonRight: {
    flex: 1,
    textAlign: 'right',
    fontSize: 18,
    fontWeight: '300',
    paddingRight: 15,
  },
  rightContainer: {
    flex: 1,
  },
  rowBack: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEE',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  subtitle: {
    color: '#666',
    fontSize: 12,
  },
  tabText: {
    paddingTop: 6,
    fontWeight: '400',
    fontSize: 16,
  },
});

reactMixin(sessionScene.prototype, TimerMixin);
module.exports = sessionScene;
