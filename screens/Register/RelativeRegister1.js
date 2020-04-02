import React, { Component,Fragment } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,ScrollView, Picker } from 'react-native';
import axios from 'axios';
import querystring from 'query-string';
import {Formik} from 'formik';
import * as yup from 'yup';
import {TextInputMask} from 'react-native-masked-text';
import moment from 'moment';

export default class PatientLogin extends Component {

static navigationOptions = {
      headerTitle:'Dados pessoais',
      headerStyle: { backgroundColor: '#FF5F54' },
      headerTintColor: 'white',
  }
      // <Image style={styles.imgLogo} source={require('../images/whiteLogo.png')} />
  constructor(props) {
    super(props);
    this.state = { error: ''}
  }
  componentDidMount(){
  }
  componentDidUpdate(){
    const {params} = this.props.navigation.state
    if(params != this.state.error){
      this.setState({error: params})
      console.log(this.state.error)
    }
  }
  render() {
    return (
        <ScrollView style={styles.scrollView}>
          <Formik
            initialValues={{
              nome: '',
              idade: '',
              sexo: '',
              telefone: '',
              email: '',
              ocupacao: '',
              senha: '',
              confirmsenha: ''
            }}
            onSubmit={ values => moment(values.idade, 'DD/MM/YYYY').isValid()
            ? this.props.navigation.navigate('RelativeRegister2', {
                values,
                telefoneunmasked: this.phoneField.getRawValue(),
              })
            : console.log(
                moment(values.idade, 'DD/MM/YYYY').isValid(),
                values,) 
            }
            validationSchema={yup.object().shape({
              nome: yup
                .string()
                .matches(/^[A-z]/, 'Este Campo não pode conter numeros')
                .required('Nome é um campo obrigatório')
                .min(3, 'O Campo tem que ter mais de 3 caracteres')
                .max(50, 'O Campo não pode passar de 50 caracteres'),
  
              idade: yup.string().required('Idade é um campo obrigatório'),
  
              sexo: yup.string().required('Sexo é um campo obrigatório'),
  
              telefone: yup.string().required('Telefone é um campo obrigatório'),
  
              email: yup
                .string()
                .email('Este é um campo para email')
                .required('Email é um campo obrigatório')
                .min(10, 'O Campo tem que ter mais de 10 caracteres')
                .max(30, 'O Campo não pode passar de 30 caracteres'),
  
              ocupacao: yup
                .string()
                .matches(/^[A-z]/, 'Este Campo não pode conter números')
                .required('Ocupação é um campo obrigatório')
                .min(5, 'O Campo tem que ter mais de 5 caracteres')
                .max(30, 'O Campo não pode passar de 30 caracteres'),
  
              senha: yup
              .string()
              .min(6,'O Campo tem que ter mais de 6 caracteres')
              .max(10,'O Campo não pode passar de 10 caracteres' )
              .required('Senha é um campo obrigatório'),
  
              confirmsenha: yup
                .string()
                .min(6,'O Campo tem que ter mais de 6 caracteres')
                .max(10,'O Campo não pode passar de 10 caracteres' )
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
            handleSubmit,
          }) => (
          <Fragment>
            <Text style={styles.textInput}>Nome</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('nome')}
              value={values.nome}
              onBlur={() => setFieldTouched('nome')}
              placeholder="Ex. Claudio"
            />
            { touched.nome && errors.nome && (
              <Text>{errors.nome}</Text>
            )}
            <Text style={styles.textInput}>Idade</Text>
            <TextInputMask
              type={'datetime'}
              options={{
                format: 'DD/MM/YYYY'
              }}
              style={styles.input}
              onChangeText={handleChange('idade')}
              value={values.idade}
              onBlur={() => setFieldTouched('idade')}
              placeholder="Ex. 10/02/2002"
            />
            { touched.idade && errors.idade && (
              <Text>{errors.idade}</Text>
            )}

            <Text style={styles.textInput}>Sexo</Text>
            <Picker
              selectedValue={values.sexo}
              style={styles.input}
              onValueChange={handleChange('sexo')}
              onBlur={() => setFieldTouched('sexo')}
            >
              <Picker.Item label="Escolha uma opção" value="null" />
              <Picker.Item label="Masculino" value="Male" />
              <Picker.Item label="Feminino" value="Female" />
              <Picker.Item label="Outros" value="Another" />
            </Picker>
            { touched.sexo && errors.sexo && (
              <Text>{errors.sexo}</Text>
            )}
            <Text style={styles.textInput}>Telefone</Text>
            <TextInputMask
              type={'cel-phone'}
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99)',
              }}
              style={styles.input}
              onChangeText={handleChange('telefone')}
              value={values.telefone}
              onBlur={() => setFieldTouched('telefone')}
              ref={ref => {
                this.phoneField = ref;
              }}
              maxLength={15}
              placeholder="Ex. (81) 99999-9999"
              />
              { touched.telefone && errors.telefone && (
                <Text>{errors.telefone}</Text>
              )}

            <Text style={styles.textInput}>Email</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('email')}
              value={values.email}
              onBlur={() => setFieldTouched('email')}
              placeholder="Ex. Familiar@email.com"
            />
            { touched.email && errors.email && (
                <Text>{errors.email}</Text>
            )}

            <Text style={styles.textInput}>Ocupação</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('ocupacao')}
              value={values.ocupacao}
              onBlur={() => setFieldTouched('ocupacao')}
              placeholder="Ex. Analista"
            />
            { touched.ocupacao && errors.ocupacao && (
                <Text>{errors.ocupacao}</Text>
            )}
            <Text style={styles.textInput}>Senha</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              onChangeText={handleChange('senha')}
              value={values.senha}
              onBlur={() => setFieldTouched('senha')}
              placeholder="******"
            />
            { touched.senha && errors.senha && (
                <Text>{errors.senha}</Text>
            )}
            <Text style={styles.textInput}>Confirmação de senha</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              onChangeText={handleChange('confirmsenha')}
              value={values.confirmsenha}
              onBlur={() => setFieldTouched('confirmsenha')}
              placeholder="******"
            />
            { touched.confirmsenha && errors.confirmsenha && (
                <Text>{errors.confirmsenha}</Text>
            )}
            <TouchableOpacity 
              style={styles.submitButton}
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