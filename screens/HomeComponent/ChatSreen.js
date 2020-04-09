import React, { Component } from 'react';

import { View, Text } from 'react-native';


export default class ChatScreen extends Component {
  static navigationOptions = {
    title: 'Chat',
  };
  render() {
    return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>CHAT!</Text>
    </View>
    );
  }
}
