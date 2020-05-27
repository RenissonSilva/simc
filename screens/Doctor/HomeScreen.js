import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ListHandbook from '../HandBook/ListHandbook';

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
            <View style={{marginLeft: '10%', marginRight: '10%', marginTop: '2%', marginBottom: '3%'}} >
              <ListHandbook/>
            </View>
            <TouchableOpacity
              onPress={ () => this.props.navigation.navigate('SearchUser',{nextPage: 'CreateHandBook'})}
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
