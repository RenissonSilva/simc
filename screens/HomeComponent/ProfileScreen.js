import React, { Component } from 'react';
import styles from './style';
import { View, Text, Image ,ScrollView, TouchableOpacity} from 'react-native';
import axios from 'axios';
import http from '../../services/axiosconf';
import AsyncStorage from '@react-native-community/async-storage';
import Loading from '../Loading';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconLogout from '../../icon/logout.svg';
export default class ProfileScreen extends Component {
  
  static navigationOptions = {
    title: 'Profile',
  };

  state = {token: '', user: '', loading: false, nome: '', datanasc: '', telefone: null, sexo: '', email: '', ocupacao: '', endereco: '',cidade: '', estado: '',cep: '', especializacao: '', crm: '' }

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
    
    http.get('/'+this.state.user+'/detail', {
      headers: {
        'Accept': 'application/json',
        'Authorization': this.state.token
      }
    })
    .then(
      res => { 
        if(res.data){
          if(this.state.user == 'patient' || this.state.user == 'relative'){
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
          }
          else if(this.state.user == 'doctor'){
            this.setState({
              nome: res.data.name,
              email: res.data.email,
              especializacao: res.data.specialization,
              crm:  res.data.crm
            })
          }

          this.setState({loading:false})
        }
      }
    )
    .catch(
      error  => {
        console.log('Error get profile', error)
        this.props.navigation.navigate('LoadHome');
    })
  }


  signOut = async () => {
    this.setState({loading: true});

    await AsyncStorage.multiGet(['Token','User']).then( (evt) => {
        this.setState({token : evt[0][1]})
        this.setState({user : evt[1][1]})
    })

    await http.post('/'+this.state.user+'/logout',{},{
        headers: {
            'Accept': 'application/json',
            'Authorization': this.state.token
        }
    }).then(res => {
        if(res.data){
            AsyncStorage.clear();
            if(user == 'patient'){
              GoogleFit.disconnect();
            }
            this.props.navigation.navigate('LoadHome');
        }
    })
    .catch(
        error => {
            console.log('error signout', error);
            if(error){
              this.props.navigation.navigate('LoadHome');
            }
        }
    )

  }


  render() {
    if(this.state.loading){
      return(
        <Loading/>
      )
    }
    if(!this.state.loading){

      if(this.state.user == 'patient' || this.state.user == 'relative'){
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
            <TouchableOpacity
              onPress = { this.signOut }>
              <Text style = {styles.submitText}> Sair </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        );
      }
      if(this.state.user == 'doctor'){
        return(
          <View style={styles.container}>
          <ScrollView>
          <Image
            style={styles.imgProfile}
            source={require('../../images/profilePatient.jpg')}
          />
          <Text style={styles.nome}>{this.state.nome}</Text>
  
          <View style={styles.containerDados}>
            <View style={styles.infoIcon}>
              <Image
                style={styles.imgIcon}
                source={require('../../images/info.png')}
                />
              <Text style={styles.info}>Informações pessoais</Text>
            </View>
            <Text style={styles.dado}>CRM : {this.state.crm}</Text>
            <Text style={styles.dado}>Espacialização : {this.state.especializacao}</Text>
          <Text style={styles.dado}>E-mail: {this.state.email}</Text>
              </View>
              <TouchableOpacity
                onPress = { this.signOut }
                style={styles.btnsignout}>
                  <View style={styles.viewbtnsignout}>
                    <IconLogout style={styles.iconbtnsiginout}/>
                    <Text style={styles.textbtnsugnout}> Sair </Text>
                  </View>
              </TouchableOpacity>
            </ScrollView>
          </View>

        );
      }
      return(
        <Loading/>
      )
    }
  }
}
