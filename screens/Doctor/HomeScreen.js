import React from 'react';

import { View, Text } from 'react-native';

// import { Container } from './styles';

export default class DoctorHome extends React.Component {

  static navigationOptions = {
    title: 'Status',
  };

    constructor(props){
        super(props)
    }


  render() {
    return (
        <View>
            <Text>DoctorHome</Text>
        </View>
    );
  }
}
