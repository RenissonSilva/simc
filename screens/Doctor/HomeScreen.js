import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ListHandbook from '../HandBook/ListHandbook';
import styles from './style';

export default class DoctorHome extends React.Component {

  static navigationOptions = {
    title: 'Status',
  };

    constructor(props){
        super(props)
    }


  render() {
    return (
        <View style={styles.viewGeral}>
            <View style={styles.listHandbook} >
              <ListHandbook/>
            </View>
          <View style={styles.viewPront}>
            <TouchableOpacity
              onPress={ () => this.props.navigation.navigate('SearchUser',{nextPage: 'CreateHandBook'})}
              style={styles.iconaddhandbook}
              > 
              <Icon
                name="add"
                size={65}
                style={styles.iconaddhandbookinto}
                />
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}
