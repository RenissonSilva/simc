import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import styles from './style';

export default class ChatScreen extends Component {
  static navigationOptions = {
    title: 'Chat',
  };
  render() {
    return (
      <>
        <View style={styles.boxChat}>
          <View>
            <Image
              style={styles.imgUser}
              source={require('../../images/doctor.png')}
            />
          </View>
          <View style={styles.boxMsg}>
            <Text style={styles.name}>Dr. Paulo</Text>
            <Text numberOfLines={2} style={styles.msg}>
              Os resultados dos seus exames saíram hoje pela manhã.
            </Text>
          </View>
        </View>

        <View style={styles.boxChat}>
          <View>
            <Image
              style={styles.imgUser}
              source={require('../../images/profilePatient.jpg')}
            />
          </View>
          <View style={styles.boxMsg}>
            <Text style={styles.name}>Dr. Roberto</Text>
            <Text numberOfLines={2} style={styles.msg}>
              Teste
            </Text>
          </View>
        </View>
      </>
    );
  }
}
