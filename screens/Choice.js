import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Image, TouchableOpacity, Text, View, ImageBackground } from 'react-native';

export default class App extends React.Component {
  static navigationOptions = {
      headerTitle:'Paciente',
      headerStyle: { backgroundColor: '#FF5F54' },
      headerTintColor: 'white',
  }
  render() {
    return (
      <View style={styles.container}>

        <Image style={styles.imgProfile} source={require('../images/profilePatient.jpg')} />
        <Text style={styles.nome}>Renato Silva</Text>
        <Text style={styles.ano}>1996</Text>

        <Text style={styles.info}><Image style={styles.imgIcon} source={require('../images/info.png')} />Informações pessoais</Text>
        <Text style={styles.dado}>Telefone : 988445577</Text>
        <Text style={styles.dado}>Sexo : Masculino</Text>
        <Text style={styles.dado}>E-mail: renatosilva@gmail.com</Text>
        <Text style={styles.dado}>Ocupação: Engenheiro</Text>

        
        <Text style={styles.info}><Image style={styles.imgIcon} source={require('../images/address.png')} />Endereço</Text>
        <Text style={styles.dado}>Av. Fagundes Varela, 100</Text>
        <Text style={styles.dado}>Cidade: Olinda </Text>
        <Text style={styles.dado}>Estado: Pernambuco</Text>
        <Text style={styles.dado}>CEP: 21652-100</Text>
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  imgProfile:{
    borderRadius:80,
    width:160,
    height:160,
    alignSelf:'center',
    marginTop:20,
  },
  nome:{
    fontSize:30,
    color:'#FF5F54',
    alignSelf:'center',
    fontWeight:'bold',
  },
  ano:{
    fontSize:28,
    color:'#FF5F54',
    alignSelf:'center',
  },
  info:{
    marginTop:10,
    paddingBottom:10,
    fontSize:22,
    color:'#FF5F54',
    alignSelf:'center',
    fontWeight:'bold',
  },
  dado:{
    fontSize:20,
    color:'#FF5F54',
    alignSelf:'center',
  },
  imgIcon:{
    width:30,
    height:30,
  },
});