import React, { Component } from 'react';
import styles from './style';
import { View, Text, Image ,ScrollView} from 'react-native';
import axios from 'axios';
import http from '../../services/axiosconf';
import AsyncStorage from '@react-native-community/async-storage';
import Loading from '../Loading';
export default class ProfileScreen extends Component {
  
  static navigationOptions = {
    title: 'Profile',
  };

  state = {token: '', user: '', loading: false, nome: '', datanasc: '', telefone: null, sexo: '', email: '', ocupacao: '', endereco: '',cidade: '', estado: '',cep: '' }

  constructor(props){
    super(props)

  }
  componentDidMount(){
    this.setState({loading: true})
    this.getProfile();
  }
  
  getProfile = async () => {

    await AsyncStorage.multiGet(['Token','User']).then( evt => {
      this.setState({user: evt[1][1]})
      this.setState({token: evt[0][1]})
    })
    //console.log(this.state);
    
    http.get('/'+this.state.user+'/detail', {
      headers: {
        'Accept': 'application/json',
        'Authorization': this.state.token
      }
    })
    .then(
      res => { 
        //console.log(res.data);
        if(res.data){
          this.setState({
            nome: res.data.name,
            datanasc: res.data.birthday,
            telefone: res.data.telephone,
            sexo: res.data.sex,
            email:  res.data.email,
            ocupacao: res.data.occupation,
            endereco: res.data.address,
            cidade: res.data.city,
            estado: res.data.country,
            cep:  res.data.zip
          })
          this.setState({loading:false})
        }
      }
    )
    .catch(
      error  => {
        console.log(error)
    })
    

  }


  render() {
    if(this.state.loading){
      return(
        <Loading/>
      )
    }
    if(!this.state.loading){
      return (
        <View style={styles.container}>
      <ScrollView>
      <Image
        style={styles.imgProfile}
        source={require('../../images/profilePatient.jpg')}
      />
      <Text style={styles.nome}>{this.state.nome}</Text>
      <Text style={styles.ano}>{this.state.datanasc}</Text>

      <View style={styles.containerDados}>
        <View style={styles.infoIcon}>
          <Image
            style={styles.imgIcon}
            source={require('../../images/info.png')}
            />
          <Text style={styles.info}>Informações pessoais</Text>
        </View>
        <Text style={styles.dado}>Telefone : {this.state.telefone}</Text>
        <Text style={styles.dado}>Sexo : {this.state.sexo}</Text>
      <Text style={styles.dado}>E-mail: {this.state.email}</Text>
        <Text style={styles.dado}>Ocupação: {this.state.ocupacao}</Text>

        <View style={styles.infoIcon}>
          <Image
            style={styles.imgIcon}
            source={require('../../images/address.png')}
          />
          <Text style={styles.info}>Endereço</Text>
        </View>
          <Text style={styles.dado}>{this.state.endereco}</Text>
          <Text style={styles.dado}>{this.state.cidade}</Text>
          <Text style={styles.dado}>Estado: {this.state.estado}</Text>
          <Text style={styles.dado}>CEP: {this.state.cep}</Text>
          </View>
        </ScrollView>
      </View>
      );
    }
  }
}
