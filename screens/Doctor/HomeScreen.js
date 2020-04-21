import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
            <TouchableOpacity
              onPress={ () => this.props.navigation.navigate('CreateHandBook')}
            >
              <Icon
                name="add"
                size={70}
              />
            </TouchableOpacity>
        </View>
    );
  }
}
