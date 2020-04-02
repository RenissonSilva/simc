import React, { Component, Fragment } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,ScrollView } from 'react-native';
import querystring from 'query-string';
import moment from 'moment';
import {TextInputMask} from 'react-native-masked-text';
import {Formik} from 'formik';
import * as yup from 'yup';
import Loading from '../Loading';
import http from '../../services/axiosconf';
import axios from 'axios';

export default class DoctorRegister extends Component {

static navigationOptions = {
      headerTitle:'Dados pessoais',
      headerStyle: { backgroundColor: '#FF5F54' },
      headerTintColor: 'white',
  }
  
  constructor(props) {
    super(props);
    this.state={loading: false}
  }

  render() {
    if(this.state.loading){
      return(
        <Loading/>
      )
    }
    if(!this.state.loading){
      return (
          <ScrollView style={styles.scrollView}>
            <Formik
              initialValues={{
                nome: '',
                especializacao: '',
                crm: '',
                email: '',
                senha: '',
                confirmsenha: '',
              }}
              onSubmit={values => {
                this.Register(values);
              }}
              validationSchema={yup.object().shape({
                nome: yup
                .string()
                .matches(/^[A-z]/, 'Este Campo não pode conter numeros')
                .required('Nome é um campo obrigatório')
                .min(2, 'O Campo tem que ter mais de 2 caracteres')
                .max(50, 'O Campo não pode passar de 50 caracteres'),

                email: yup
                .string()
                .email('Este é um campo para email')
                .required('Email é um campo obrigatório')
                .min(10, 'O Campo tem que ter mais de 10 caracteres')
                .max(30, 'O Campo não pode passar de 30 caracteres'),

                especializacao: yup
                .string()
                .matches(/^[A-z]/, 'Este Campo não pode conter numeros')
                .required('Nome é um campo obrigatório')
                .min(5, 'O Campo tem que ter mais de 5 caracteres')
                .max(50, 'O Campo não pode passar de 50 caracteres'),

                crm: yup
                .string()
                .required('CRM é um campo obrigatório')
                .min(6, 'O Campo tem que ter mais de 6 caracteres')
                .max(12, 'O Campo não pode passar de 12 caracteres'),
                

                senha: yup
                .string()
                .min(6,'O Campo tem que ter mais de 6 caracteres')
                .max(16,'O Campo não pode passar de 10 caracteres' )
                .required('Senha é um campo obrigatório'),

                confirmsenha: yup
                  .string()
                  .min(6,'O Campo tem que ter mais de 6 caracteres')
                  .max(16,'O Campo não pode passar de 10 caracteres' )
                  .oneOf(
                    [yup.ref('senha'), null],
                    'As senhas não podem ser diferentes',
                  )
                  .required('Confirmação de senha é um campo obrigatório'),

              })}>

            {({
              values,
              handleChange,
              errors,
              setFieldTouched,
              touched,
              isValid,
              handleSubmit
            }) => (
            <Fragment>
            <Text style={styles.textInput}>Nome</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('nome')}
              value={values.nome}
              onBlur={() => setFieldTouched('nome')}
              placeholder="Ex. Claudia"
            />
            {touched.nome && errors.nome && (
              <Text>{errors.nome}</Text>
            )}
            <Text style={styles.textInput}>Especialização</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('especializacao')}
              value={values.especializacao}
              onBlur={()=> setFieldTouched('especializacao')}
              placeholder="Ex. Fisioterapia"
            />
            {touched.especializacao && errors.especializacao && (
              <Text>{errors.especializacao}</Text>
            )}
            <Text style={styles.textInput}>CRM</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('crm')}
              value={values.crm}
              onBlur={() => setFieldTouched('crm')}
              placeholder="Ex. 5355PE"
            />
            {touched.crm && errors.crm && (
              <Text>{errors.crm}</Text>
            )}
            <Text style={styles.textInput}>Email</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('email')}
              value={values.email}
              onBlur={() => setFieldTouched('email')}
              placeholder="Ex. doutor@email.com"
            />
            {touched.email && errors.email && (
              <Text>{errors.email}</Text>
            )}
            <Text style={styles.textInput}>Senha</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              onChangeText={handleChange('senha')}
              value={values.senha}
              onBlur={() => setFieldTouched('senha')}
              placeholder="********"
            />
            {touched.senha && errors.senha && (
              <Text>{errors.senha}</Text>
            )}
            <Text style={styles.textInput}>Confirmação de senha</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              onChangeText={handleChange('confirmsenha')}
              value={values.confirmsenha}
              onBlur={() => setFieldTouched('confirmsenha')}
              placeholder="*********"
            />
            {touched.confirmsenha && errors.confirmsenha && (
              <Text>{errors.confirmsenha}</Text>
            )}
            <TouchableOpacity
                style = {styles.submitButton}
                onPress={handleSubmit}
                disabled={!isValid} >
                <Text style = {styles.submitText}> Confirmar </Text>
            </TouchableOpacity>

            </Fragment>
            )}
          </Formik>
          </ScrollView>
        );
    }
  }

  Register(values){
    this.setState({loading: true});
    http.post('/doctor/register?', querystring.stringify({
      name: values.nome,
      email: values.email,
      crm: values.crm,
      specialization: values.especializacao,
      password: values.senha
    }))
    .then(res => {
      console.log(res.data);
      if(res.data.access_token){
        this.props.navigation.navigate('Login',{user: 'doctor'})
      }
    }).catch( error => {
      this.setState({loading: false})
      console.log(error);
    });


  }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  scrollView:{
    marginBottom:50,
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