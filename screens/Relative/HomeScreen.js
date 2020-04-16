import React from 'react';

import { View, Text } from 'react-native';
import axios from 'axios';


export default class RelativeHome extends React.Component {

  static navigationOptions = {
    title: 'Home',
  };

  constructor(props){
    super(props)
    this.state = {data: null};
    this.state = {dataerror: null};
  }

  next(item){
    this.props.navigation.navigate('PatientHome', {token: item} )
  };

  componentDidMount(){
   
  }

  render() {
    return (
        <View>
            <Text> RelativeHome</Text>
        </View>
    );
  }
}
