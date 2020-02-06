import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity, Text, View, ImageBackground, Button } from 'react-native';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        headerShown: false
    }
  render() {
    return (
      <ImageBackground source={require('../images/watch.jpeg')} style={styles.imgBg}>
        <Image style={styles.imgLogo} source={require('../images/whiteLogo.png')} />
      <View style={styles.container}>
        <Text style={styles.txtTitulo}>
          Monitoramento cardíaco
        </Text>
        <Text style={styles.txtDescricao}>
          Acompanhamento em tempo real
        </Text>
        <View style={styles.btns}>
          <TouchableOpacity style={styles.btn}
            onPress = {() => { this.props.navigation.navigate('ChoiceRegis')}}
          >
              <Text style={styles.btnText}>Cadastrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}
            onPress = {() => { this.props.navigation.navigate('Choice')}}
            >
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
  txtTitulo:{
    color:'#fff',
    fontSize:45,
    marginLeft:20,
  },
  txtDescricao:{
    color:'#fff',
    fontSize:24,
    marginBottom:50,
    marginLeft:20,
  },
});