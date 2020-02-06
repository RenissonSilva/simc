import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity, Text, View, ImageBackground } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <ImageBackground source={require('./images/watch.jpeg')} style={styles.imgBg}>
        <Image style={styles.imgLogo} source={require('./images/whiteLogo.png')} />
      <View style={styles.container}>

        <View style={styles.btns}>
          <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>Cadastrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>Entrar</Text>
          </TouchableOpacity>
          </View>

        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'flex-end',
  },
  imgBg:{
    flex:1,
  },
  btns:{
    flexDirection:'row',
    alignSelf:'center',
  },
  btn:{
    justifyContent:'center',
    width:"45%",
    height: 50,
    backgroundColor:'#FF5F54',
    margin:10,
    borderRadius:10,
  },
  btnText:{
    alignSelf:'center',
    color:'#fff',
    fontSize:18,
    fontWeight:'bold',
  },
  imgLogo:{
    width: 80,
    height: 80,
    margin:10,
    alignSelf:'flex-end',
  },
});