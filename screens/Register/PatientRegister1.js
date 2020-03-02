import React, { Component, Fragment } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,ScrollView, Picker, Button } from 'react-native';
import axios from 'axios';
import querystring from 'query-string';
import validate from 'validate.js';
import { TextInputMask } from 'react-native-masked-text';
import moment from 'moment';
import {Formik} from 'formik';
import * as yup from 'yup';

export default class PatientRegister1 extends Component {

static navigationOptions = {
      headerTitle:'Dados pessoais',
      headerStyle: { backgroundColor: '#FF5F54' },
      headerTintColor: 'white',
  }
      // <Image style={styles.imgLogo} source={require('../images/whiteLogo.png')} />
  
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    moment.locale('pt-BR');
  }

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        
        <Formik
          initialValues={{nome: '', idade: '', sexo: '', telefone: '',email: '', ocupacao: '', senha: '', confirmsenha: ''}}
          onSubmit={values => ( moment(values.idade, 'DD/MM/YYYY').isValid()) ? this.props.navigation.navigate('PatientRegister2',{values ,telefoneunmasked: this.phoneField.getRawValue()}) : console.log(moment(this.state.idade, 'DD/MM/YYYY').isValid(), values) }
          validationSchema={yup.object().shape({
              nome: yup
              .string()
              .matches(/^[A-z]/,'Este Campo não pode conter numeros')
              .required('Nome e um campo obrigatório')
              .min(3, 'O Campo tem que ter mais de 3 caracteres')
              .max(50, 'O Campo não pode passar de 50 caracteres'),

              idade: yup
              .string()
              .required('Idade e um campo obrigatório'),

              sexo: yup
              .string()
              .required('Sexo e um campo obrigatório'),

              telefone: yup
              .string()
              .required('Telefone e um campo obrigatório'),

              email: yup
              .string()
              .email('Este e um campo para email')
              .required('Email e um campo obrigatório')
              .min(10, 'O Campo tem que ter mais de 10 caracteres')
              .max(30, 'O Campo não pode passar de 30 caracteres'),
              
              ocupacao: yup
              .string()
              .matches(/^[A-z]/,'Este Campo não pode conter numeros')
              .required('Ocupação e um campo obrigatório')
              .min(4,'O Campo tem que ter mais de 4 caracteres')
              .max(30, 'O Campo não pode passar de 30 caracteres'),

              senha: yup
              .string()
              .required('Senha e um campo obrigatório'),

              confirmsenha: yup
              .string()
              .oneOf([yup.ref('senha'), null],'As senhas não podem ser diferentes')
              .required('Confirmação de senha e um campo obrigatório')




          })}>
        
      {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
        <Fragment>
          <Text style={styles.textInput}>Nome</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('nome')}
            value={values.nome}
            onBlur={() => setFieldTouched('nome')}
            placeholder="Ex. Reniusson"
            //onEndEditing = {this.validar}
          />
          { touched.nome && errors.nome &&
            <Text style={{fontSize:10, color: 'red'}}>{errors.nome}</Text>
          }

          <Text style={styles.textInput}>Idade</Text>
          <TextInputMask
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY'
            }}
            style={styles.input}
            onChangeText={handleChange('idade')}
            value={values.idade}
            onBlur={()=> setFieldTouched('idade')}
            placeholder="Ex. 10/10/2010"
          />
          { touched.idade && errors.idade &&
            <Text style={{fontSize:10, color: 'red'}}>{errors.idade}</Text>
          }

          <Text style={styles.textInput}>Sexo</Text>
          <Picker
            selectedValue={values.sexo}
            style={styles.picker}
            onValueChange={handleChange('sexo')}
            onBlur={() => setFieldTouched('sexo')}
          >
            <Picker.Item label="Escolha uma opção" value="" />
            <Picker.Item label="Masculino" value="Male" />
            <Picker.Item label="Feminino" value="Female" />
            <Picker.Item label="Outros" value="Another" />
          </Picker>

          { touched.sexo && errors.sexo &&
            <Text style={{fontSize:10, color: 'red'}}>{errors.sexo}</Text>
          }

          <Text style={styles.textInput}>Telefone</Text>
          <TextInputMask
            type={'cel-phone'}
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) '
            }}
            style={styles.input}
            onChangeText={handleChange('telefone')}
            value={values.telefone}
            onBlur={() => setFieldTouched('telefone')}
            ref={(ref) => {this.phoneField = ref}}
            maxLength={15}
            placeholder="Ex. (81) 99999-9999"
            
          />
          { touched.telefone && errors.telefone &&
            <Text style={{fontSize:10, color: 'red'}}>{errors.telefone}</Text>
          }
          

          <Text style={styles.textInput}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('email')}
            value={values.email}
            onBlur={() => setFieldTouched('email')}
            placeholder="Ex. gato2010@bol.com"
          />
          { touched.email && errors.email &&
            <Text style={{fontSize:10, color: 'red'}}>{errors.email}</Text>
          }

          <Text style={styles.textInput}>Ocupação</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('ocupacao')}
            value={values.ocupacao}
            onBlur={()=> setFieldTouched('ocupacao')}
            placeholder="Ex. Garoto de Programa(dev)"
          />
          { touched.ocupacao && errors.ocupacao &&
            <Text style={{fontSize:10, color: 'red'}}>{errors.ocupacao}</Text>
          }

          <Text style={styles.textInput}>Senha</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            onChangeText={handleChange('senha')}
            value={values.senha}
            onBlur={() => setFieldTouched('senha')}
            placeholder="Ex. senhasenha"
          />
           { touched.senha && errors.senha &&
            <Text style={{fontSize:10, color: 'red'}}>{errors.senha}</Text>
          }

          <Text style={styles.textInput}>Confirmação de senha</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            onChangeText={handleChange('confirmsenha')}
            value={values.confirmSenha}
            onBlur={() => setFieldTouched('confirmsenha')}
            placeholder="Ex. senhasenha"
          />
           { touched.confirmsenha && errors.confirmsenha &&
            <Text style={{fontSize:10, color: 'red'}}>{errors.confirmsenha}</Text>
          }

          <TouchableOpacity style={styles.submitButton} 
          //onPress = {this.continue_register}
          disabled={!isValid}
          onPress={handleSubmit}
          >
            <Text style = {styles.submitText}> Continuar </Text>
          </TouchableOpacity>
        </Fragment>
      )}
        </Formik>
      </ScrollView>

    );
  }


}
const validation = {
  nome: {
    presence: true,
    length: {
      minimum: 3,
      message: "must be at least 3 characters"
    }
  },
  senha:{
    presence: true,
    length: {
      minimum: 6,
      message: "must be at least 6 characters"
    }
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
  picker:{
    color:'#FF5F54',
    marginLeft:50,
    marginRight:50,
  },
});