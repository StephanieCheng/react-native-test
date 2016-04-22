'use strict';

import React, {
  AlertIOS,
  Image,
  ListView,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import {DATA} from './dummyData.js'; // Dummy data


var Button = require('react-native-button');
var Router = require('./router.js');


class HomeScene extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      hasPages: false,
      isLoading: true,
      pages: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  }

  componentDidMount() {
    this.fetchPagesJson();
  }

  fetchPagesJson() {
    var url = 'http://bespin1.jupd.org:8080/events/pagelist';
    var dummyPages = DATA.pages;
    // var dummyPages = [{id: '782507861794205'}]; // Single page

    this.setState({
      hasPages: dummyPages.length > 1 ? true : false,
      isLoading: false,
      pages: this.state.pages.cloneWithRows(dummyPages),
    });

    // fetch(url)
    //   .then( response => response.json() )
    //   .then( jsonData => {

    //     this.setState({
    //       isLoading: false,
    //       pages: this.state.pages.cloneWithRows(jsonData),
    //     });
    //   })
    // .catch( error => console.error('Fetch error: ' + error) );
  }

  onPress(page) {
    // AlertIOS.alert('Pressed', page.name);
    let route = Router.getPostsRoute(page);
    this.props.navigator.push(route);
  }

  render() {
    var {hasPages, isLoading, pages} = this.state;

    if(isLoading) {
      return this.renderLoading();
    }else if(hasPages) {
      console.log('[render] has multiple pages');
      let client = {};
      return this.renderHome();
    }else {
      console.log('[render] single page');

      let page = pages[0].id;
      let postsRoute = Router.getPostsRoute(page)
      this.props.navigator.push(postsRoute);
      return this.renderHome();
    }
  }

  renderHome() {
    // console.log('[renderHome]', this.state.pages);
    return (
      <ListView
        dataSource={this.state.pages}
        renderRow={this.renderRow.bind(this)}
        style={styles.container} />
    );
  }
  // <Button onPress={() => {
  //   // Get a route object from the router
  //   let profile = {
  //     name: 'Jane',
  //     photoUrl: 'http://api.randomuser.me/portraits/thumb/women/39.jpg',
  //   };
  //   let route = Router.getProfileRoute(profile);

  //   // `navigator` is passed into your scene component when you have
  //   // implemented getSceneClass in your route
  //   this.props.navigator.push(route);
  // }}>
  //   Navigate to a profile
  // </Button>

  renderLoading() {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    );
  }

  renderRow(page) {
    return (
      <TouchableHighlight
        activeOpacity={0.5}
        underlayColor={'white'}
        onPress={this.onPress.bind(this, page)}>

        <View style={styles.rowContainer}>
          <Image source={{uri: page.avatarUrl}} style={styles.avatar} />
          <View style={styles.rightContainer}>
            <Text>{page.name}</Text>
            <Text style={styles.subtitle}>{page.category}</Text>
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

module.exports = HomeScene;
