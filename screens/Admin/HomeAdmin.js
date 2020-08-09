import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet, Image, TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import IconLogout from '../../icon/logout.svg';
import axios from 'axios';
import http from '../../services/axiosconf';
import AsyncStorage from '@react-native-community/async-storage';

export default class App extends React.Component {
  
  signOut = async () => {
    this.setState({loading: true});

    await AsyncStorage.multiGet(['Token', 'User']).then(evt => {
      this.setState({token: evt[0][1]});
      this.setState({user: evt[1][1]});
    });

    await http
      .post(
        '/' + this.state.user + '/logout',
        {},
        {
          headers: {
            Accept: 'application/json',
            Authorization: this.state.token,
          },
        },
      )
      .then(res => {
        if (res.data) {
          AsyncStorage.clear();
          if (this.state.user == 'patient') {
            GoogleFit.disconnect();
          }
          this.props.navigation.navigate('LoadHome');
        }
      })
      .catch(error => {
        console.log('error signout', error);
        if (error) {
          this.props.navigation.navigate('LoadHome');
        }
      });
  };
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
        <TouchableOpacity onPress={this.signOut} style={styles.btnsignout}>
          <View style={styles.viewbtnsignout}>
            <IconLogout style={styles.iconbtnsiginout} />
            <Text style={styles.textbtnsugnout}> Sair </Text>
          </View>
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
  },
  btnsignout: {
    marginTop: '5%',
    marginBottom: '5%',
    marginLeft: '35%',
    marginRight: '35%',
    borderRadius: 15,
    padding: 5,
    backgroundColor: '#FF5F54',
  },
  viewbtnsignout: {
    marginTop: '2%',
    marginBottom: '2%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textbtnsugnout: {
    color: '#fff',
    fontSize: 16,
    alignSelf:'center',
  },
  iconbtnsiginout: {
    color: '#fff',
  },
});