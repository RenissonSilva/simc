import React, { Component } from 'react';
import styles from './style';
import { View, Text, Image ,ScrollView} from 'react-native';
import axios from 'axios';
import http from '../../services/axiosconf';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

export default class ProfileScreen extends Component {

  state = {
    token : '',
    user: '',
    spinner: false
  }
  constructor(props){
    super(props)
    //this.state = {nome: '',datanasc: '', telefone: null, sexo: '', email: '', ocupacao: '', endereco: '',cidade: '', estado: '',cep: '', user: '', token: '' }

  }
  componentDidMount(){
    //this.setState({spinner: true})
    AsyncStorage.getItem('Token').then( evt => {
      //console.log(evt)
      this.setState({token: evt})
    })
    AsyncStorage.getItem('User').then( evt => {
      //console.log(evt)
      this.setState({user: evt})
    })
    http.get('/'+this.state.user+'/detail', {
      headers: {
        'Accept': 'application/json',
        'Authorization': this.state.token
      }
    })
    .then(
      res => { 
        console.log(res.data);
        //res.data ? this.setState({spinner: false}): this.setState({spinner: true}) ; 
      }
    )
    .catch(
      error  => {
        console.log(error)
    })
  }
  
  getProfile = () => {
    console.log(this.state.token.toString())
    
    let config = {
      headers: {
        'Accept': 'application/json',
        'Autorithation': this.state.token
      }
    }
    http.get('/'+this.state.user+'/detail', {
      headers: {
        'Accept': 'application/json',
        'Authorization': this.state.token
      }
    })
    .then(
      res => { 
        console.log(res.data);
      }
    )
    .catch(
      error  => {
        console.log(error)
    })
    

  }
  render() {
    return (

    <View style={styles.container}>
       <Spinner
        visible={this.state.spinner}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <ScrollView>
      <Image
        style={styles.imgProfile}
        source={require('../../images/profilePatient.jpg')}
      />
      <Text style={styles.nome} onPress={this.getProfile}>Renato Silva</Text>
      <Text style={styles.ano}>1996</Text>

      <View style={styles.containerDados}>
        <View style={styles.infoIcon}>
          <Image
            style={styles.imgIcon}
            source={require('../../images/info.png')}
          />
          <Text style={styles.info}>Informações pessoais</Text>
        </View>
        <Text style={styles.dado}>Telefone : 988445577</Text>
        <Text style={styles.dado}>Sexo : Masculino</Text>
        <Text style={styles.dado}>E-mail: renatosilva@gmail.com</Text>
        <Text style={styles.dado}>Ocupação: Engenheiro</Text>

        <View style={styles.infoIcon}>
          <Image
            style={styles.imgIcon}
            source={require('../../images/address.png')}
          />
          <Text style={styles.info}>Endereço</Text>
        </View>
        <Text style={styles.dado}>Av. Fagundes Varela, 100</Text>
        <Text style={styles.dado}>Cidade: Olinda </Text>
        <Text style={styles.dado}>Estado: Pernambuco</Text>
        <Text style={styles.dado}>CEP: 21652-100</Text>
      </View>
      </ScrollView>
    </View>
    );
  }
}
