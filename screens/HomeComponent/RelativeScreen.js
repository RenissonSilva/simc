import React, { Component } from 'react';
import styles from './style';
import { View, Text, Image, TouchableOpacity } from 'react-native';


export default class RelativeScreen extends Component {
  render() {
    return (
    <View style={styles.container}>
      <Text style={styles.title}>Familiares cadastrados</Text>
      <Image style={styles.sadIcon} source={require('../../images/sad.png')} />
      <Text style={styles.msgEmpty}>No momento não há</Text>
      <Text style={styles.title}>Convites</Text>

      <View style={styles.boxFamiliar}>
        <Image
          style={styles.imgProfileRelative}
          source={require('../../images/profileRelative.jpg')}
        />
        <View style={styles.boxFamiliarText}>
          <Text style={styles.msg}>Júlia é sua irmã ?</Text>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.check}
              onPress={() => {
                this.props.navigation.navigate('PatientLogin');
              }}>
              <Image
                style={styles.imgAccept}
                source={require('../../images/accept.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.check}
              onPress={() => {
                this.props.navigation.navigate('PatientLogin');
              }}>
              <Image
                style={styles.imgDenied}
                source={require('../../images/denied.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
    );
  }
}
