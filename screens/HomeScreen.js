import React, { Component, useState } from 'react';
import { StyleSheet, Image, TouchableOpacity, Text, View, ImageBackground, Button } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import Modal from 'react-native-modal';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        headerShown: false
    }
  constructor(props){
    super(props);
    this.state = {isConnected: false}
    this.state = {isVisible: true}
  }
  componentDidMount(){
    NetInfo.fetch().then(state => {
      //console.log("Connection type", state.type);
      //console.log("Is connected?", state.isConnected);
      state.isConnected ? this.setState({isConnected: state.isConnected}) : console.log("Is connected?", this.state.isConnected);
     });
  }
  render() {
    return (
      <ImageBackground source={require('../images/watch.jpeg')} style={styles.imgBg}>
        <Image style={styles.imgLogo} source={require('../images/whiteLogo.png')} />
      <View style={styles.container}>
        {!this.state.isConnected && (
          <View>
            <Modal isVisible={!this.state.isConnected}>
              <View style={styles.modal}>
                <Text style={styles.textModal}>Por favor conecte-se a internet</Text>
              </View>
            </Modal>
          </View>
        )}
      </View>
      <View style={styles.container}>
        <Text style={styles.txtTitulo}>
          Monitoramento cardíaco
        </Text>
        <Text style={styles.txtDescricao}>
          Acompanhamento em tempo real
        </Text>
        <View style={styles.btns}>
          <TouchableOpacity style={styles.btn}
            disabled={!this.state.isConnected}
            onPress = {() => { this.props.navigation.navigate('ChoiceRegis')}}
          >
            <Text style={styles.btnText}>Cadastrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}
            disabled={!this.state.isConnected}
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
  modal:{
    backgroundColor:'#fff',
    height:100,
    width:'80%',
    borderRadius:10,
    justifyContent:'center',
    alignSelf:'center',
  },
  textModal:{
    textAlign:'center',
    fontWeight:'bold',
    color:'#FF5F54',
  }
});