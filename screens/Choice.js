import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Image, TouchableOpacity, Text, View, ImageBackground } from 'react-native';

export default class App extends React.Component {
  static navigationOptions = {
      headerTitle:'Paciente - Renato',
      headerStyle: { backgroundColor: '#FF5F54' },
      headerTintColor: 'white',
  }
  render() {
    return (
      <View style={styles.container}>
            <Text style={styles.title}>Familiares cadastrados</Text>
            <Image style={styles.sadIcon} source={require('../images/sad.png')} />
            <Text style={styles.msgEmpty}>No momento não há</Text>
            <Text style={styles.title}>Convites</Text>

            <View style={styles.boxFamiliar}>
              <Image style={styles.imgProfile} source={require('../images/profileRelative.jpg')} />
              <Text style={styles.msg}>Júlia é sua irmã ?</Text>
            </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  title:{
    marginTop:20,
    marginLeft:40,
    paddingBottom:10,
    fontSize:22,
    color:'#FF5F54',
    fontWeight:'bold',
  },
  msgEmpty:{
    marginBottom:50,
    fontSize:19,
    color:'#FF5F54',
    fontWeight:'bold',
    alignSelf:'center',
  },
  sadIcon:{
    alignSelf:'center',
    marginTop:50,
    marginBottom:10,
  },
  boxFamiliar:{
    backgroundColor:'#FF5F54',
    width:'80%',
    height:100,
    borderRadius:20,
    alignSelf:'center',
    justifyContent:'space-between',
  },
  imgProfile:{
    borderRadius:40,
    borderColor:'white',
    borderWidth:2,
    marginLeft:20,
    marginTop:10,
  },
  msg:{
    fontSize:19,
    color:'#FF5F54',
    fontWeight:'bold',
    alignSelf:'center',
  },
});