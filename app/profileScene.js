'use strict';

import React, {
  ListView,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

var YourRouter = require('./router.js');

class Component extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      profilesJson: [],
      loading: false
    };
  }

  handlePress() {
    //this.props.navigator.pop()
    let route = YourRouter.getOtherRoute();
    this.props.navigator.push(route);
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={{fontWeight: 'bold'}}>
          {this.props.profile.name}
        </Text>

      </View>
    );
  }
}


var styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};


module.exports = Component;
