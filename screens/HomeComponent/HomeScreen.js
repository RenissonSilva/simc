import React, { Component } from 'react';
import styles from './style';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
// import { Container } from './styles';

export default class HomeScreen extends Component {
  render() {
    return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Batimento cardíaco</Text>
        <View style={styles.teste}>
          <Text style={styles.btnBpm}>81</Text>
          <Text style={styles.btnB}>bpm</Text>
        </View>
        <Icon name="heartbeat" size={70} color="#FF5F54" style={styles.icon} />
        <Animatable.Text
          animation="pulse"
          iterationCount={'infinite'}
          direction="alternate"
          style={styles.icon}>
          <Icon
            name="heartbeat"
            size={70}
            color="#FF5F54"
            style={styles.icon}
          />
        </Animatable.Text>
      </TouchableOpacity>
      <Text style={styles.monitora}>Monitoramento dos últimos 30 minutos</Text>
    </View>
    );
  }
}
