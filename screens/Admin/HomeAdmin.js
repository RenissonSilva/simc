import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet, Image, TouchableOpacity, Text, View, ImageBackground } from 'react-native';

export default class App extends React.Component {
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textExplica}>Painel de administração</Text>
        <TouchableOpacity style={styles.btn} onPress = {() => { this.props.navigation.navigate('DoctorRegister')}}>       
          <Icon name="user-plus" size={50} color="#fff" style={styles.icon}/>
          <Text style={styles.btnText}>Cadastrar médico</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress = {() => { this.props.navigation.navigate('')}}>
        <Icon name="clinic-medical" size={50} color="#fff" style={styles.icon}/>
          <Text style={styles.btnText}>Cadastrar instituição</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  
  textMenu:{
    flex:2,
    color:'#fff',
    fontSize:24,
    alignSelf:'center',
  },
  textExplica:{
    color:'#FF5F54',
    fontSize:26,
    alignSelf:'center',
    marginTop:30,
    marginBottom:30,
  },
  btn:{
    flexDirection: 'row',
    justifyContent:'center',
    width:"75%",
    height: 110,
    backgroundColor:'#FF5F54',
    margin:15,
    borderRadius:10,
    alignSelf:'center',
  },
  btnText:{
    alignSelf:'center',
    color:'#fff',
    fontSize:20,
  },
  imgLogo:{
    width: 90,
    height: 90,
    margin:10,
    alignSelf:'center',
  },
  icon:{
    alignSelf:'center',
    marginRight:'5%',
  },
  iconeSeta:{
    alignSelf:'center',
    marginRight:'10%',
    marginLeft:'5%',
  }
});