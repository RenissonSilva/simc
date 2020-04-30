import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, TextInput,SubmitButton, TouchableOpacity,Button } from 'react-native';
import axios from 'axios';
import querystring from 'query-string';
import AsyncStorage from '@react-native-community/async-storage';
import Loading from '../screens/Loading';
import {Formik} from 'formik';
import * as yup from 'yup';
import http  from '../services/axiosconf';

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
    this.state = {userid: ''}
    this.state = {token: ''};
    this.state = {data: null};
    this.state = {dataerror: null};
    this.state = {loading: false};

  }

  componentDidMount(){
    this.setState({user: this.props.navigation.state.params.user})
  }

  signIn = values => {
    this.setState({loading: true})
    return http.post('/'+this.state.user+'/login?',querystring.stringify({
      email: values.email,
      password: values.password,
    }))
    .then(res => {this.state.dataresponse = res.data  
      this.state.token = res.data.token_type + " " + res.data.access_token
      this.setState({userid:  ""+res.data.user.id.toString() })
      console.log('UserID', this.state.userid);
      try{
        AsyncStorage.setItem('Token', this.state.token);
        AsyncStorage.setItem('User', this.state.user);
        AsyncStorage.setItem('UserId', res.data.user.id + '' );
      }catch(e){
        console.log('Error set async login',e);
      }
      //this.next(this.state.token);
    })
    .catch(error => {
      //console.log(error)
      this.setState({dataerror: 'Email ou Senha nao são validos'})
      this.setState({loading: false})
    })
    
  };
  
  next(item){
    this.props.navigation.navigate( this.state.user , {token: item, user: this.state.user})
  };

  render() {
    return (
      <View style={styles.container}>
        
        { this.state.loading && <Loading/> }
         
        { !this.state.loading && (
          <View>
            { this.state.dataerror && (
              <Text>{this.state.dataerror}</Text>
            )}
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              onSubmit={
                values => this.signIn(values)
              }
              validationSchema={ yup.object().shape({
                email: yup
                .string()
                .email('Este é um campo para email')
                .required('Email é um campo obrigatório')
                .min(10, 'O Campo tem que ter mais de 10 caracteres')
                .max(30, 'O Campo não pode passar de 30 caracteres'),

                password: yup
                .string()
                .min(6,'O Campo tem que ter mais de 6 caracteres')
                .max(10,'O Campo não pode passar de 10 caracteres' )
                .required('Senha é um campo obrigatório'),

              })

              }
            >
            {({
              values,
              handleChange,
              errors,
              setFieldTouched,
              touched,
              isValid,
              handleSubmit,
            }) => (
              <View>
                <Text style={styles.textInput}>Email</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('email')}
                  value={values.email}
                  onBlur={() => setFieldTouched('email')}
                  placeholder="Ex. exemplo@email.com"
                />
                { touched.email && errors.email && (
                  <Text>{errors.email}</Text>
                )}
                <Text style={styles.textInput}>Senha</Text>
                <TextInput
                  secureTextEntry={true}
                  style={styles.input}
                  onChangeText={handleChange('password')}
                  value={values.password}
                  onBlur={() =>  setFieldTouched('password')}
                  placeholder="******"
                />
                { touched.password && errors.password && (
                  <Text>{errors.password}</Text>
                )}
                <TouchableOpacity
                      style = {styles.submitButton}
                      disabled={!isValid}
                      onPress = {handleSubmit}>
                      <Text style = {styles.submitText}> Confirmar </Text>
                </TouchableOpacity>
              </View>  
            )}
            </Formik>
          </View>
          )
        }
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