import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, TextInput,SubmitButton, TouchableOpacity,Button } from 'react-native';
import axios from 'axios';
import querystring from 'query-string';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends Component {

static navigationOptions = {
      headerTitle:'Entrar',
      headerStyle: { backgroundColor: '#FF5F54' },
      headerTintColor: 'white',
  }
      // <Image style={styles.imgLogo} source={require('../images/whiteLogo.png')} />
  
  constructor(props) {
    super(props);
    this.state = {user: ''}
    this.state = {email: ''};
    this.state = {password: ''};
    this.state = {token: ''};
    this.state = {data: null};
    this.state = {dataerror: null};

  }
  componentDidMount(){
    this.setState({user: this.props.navigation.state.params.user})

  }
  signIn = () => {
    return axios.post('https://apisimc.herokuapp.com/api/'+this.state.user+'/login?',querystring.stringify({
      email: this.state.email,
      password: this.state.password,
    }))
    .then(res => {this.state.dataresponse = res.data  
      //console.log(res)
      this.state.token = res.data.token_type + " " + res.data.access_token
      //console.log(this.state.token);
      try{
        AsyncStorage.setItem('Token', this.state.token);
        AsyncStorage.setItem('User', this.state.user);
      }catch(e){
        console.log(e);
      }
      this.next(this.state.token);
      //this.props.navigation.navigate('PatientHome', this.state.token )
    })
    .catch(error => {console.log(error)})
    
  };
  
  next(item){
    this.props.navigation.navigate('PatientHome', {token: item})
  };

  render() {
    return (
      <View style={styles.container}>
        
          <Text style={styles.textInput}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
          />
          <Text style={styles.textInput}>Senha</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
          />
          <TouchableOpacity
               style = {styles.submitButton}
               onPress = { this.signIn }>
               <Text style = {styles.submitText}> Confirmar </Text>
            </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,

  },
  textInput:{
    color:'#FF5F54',
    fontSize:20,
    marginTop:30,
    marginBottom:5,
    marginLeft:60,
  },
  input:{
    height:40,
    marginLeft:60,
    marginRight:60,
    borderBottomColor: '#FF5F54',
    borderBottomWidth: 3,
  },
  submitButton:{
    backgroundColor:'#FF5F54',
    alignSelf:"center",
    marginTop:50,
    height:40,
    width:"38%",
    justifyContent:"center",
  },
  submitText:{
    color:"#fff",
    fontSize:18,
    alignSelf:"center",
  },
});