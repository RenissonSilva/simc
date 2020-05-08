import React, {Component, Fragment} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import querystring from 'query-string';
import moment from 'moment';
import {TextInputMask} from 'react-native-masked-text';
import {Formik, useFormikContext} from 'formik';
import * as yup from 'yup';
import http from '../../services/axiosconf';

export default class PatientRegister2 extends Component {
  static navigationOptions = {
    headerTitle: 'Endereço',
    headerStyle: {backgroundColor: '#FF5F54'},
    headerTintColor: 'white',
  };

  constructor(props) {
    super(props);
    this.state = {cep: '', cepunmasked: ''};
  }
  componentDidMount() {
    const {params} = this.props.navigation.state;
    console.log(params);
    moment.locale('pt-BR');
  }

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <Formik
          initialValues={{
            cep: '',
            rua: '',
            cidade: '',
            estado: '',
            pais: '',
            numero: '',
          }}
          onSubmit={values => {
            this.Register(values);
          }}
          validationSchema={yup.object().shape({
            cep: yup.string().required('Cep e um campo obrigatório'),

            rua: yup
              .string()
              .required('Rua e um campo obrigatório')
              .min(5, 'O Campo tem que ter mais de 5 caracteres')
              .max(25, 'O Campo não pode passar de 25 caracteres'),

            pais: yup
              .string()
              .required('Pais e um campo obrigatório')
              .min(2, 'O Campo tem que ter mais de 2 caracteres')
              .max(10, 'O Campo não pode passar de 10 caracteres'),

            estado: yup
              .string()
              .required('Estado e um campo obrigatório')
              .min(2, 'O Campo tem que ter mais de 2 caracteres')
              .max(18, 'O Campo não pode passar de 10 caracteres'),

            cidade: yup
              .string()
              .required('Cidade e um campo obrigatório')
              .min(4, 'O Campo tem que ter mais de 4 caracteres')
              .max(25, 'O Campo não pode passar de 25 caracteres'),

            numero: yup
              .string()
              .matches(/^[0-9]/, 'Este Campo não pode conter Letras')
              .min(1, 'O Campo tem que ter mais de 1 números')
              .max(5, 'O Campo não pode passar de 5 caracteres')
              .required('Numero e um campo obrigatório'),
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
              <Text style={styles.textInput}>CEP</Text>
              <TextInputMask
                type={'zip-code'}
                style={styles.input}
                onChangeText={handleChange('cep')}
                value={values.cep}
                onBlur={() => {
                  setFieldTouched('cep');
                  this.procurar_cep(values.cep);
                }}
                maxLength={9}
                ref={ref => {
                  this.cepField = ref;
                }}
                placeholder="Ex. 55222-100"
              />
              {touched.cep && errors.cep && (
                <Text style={{fontSize: 10, color: 'red'}}>{errors.cep}</Text>
              )}

              <Text style={styles.textInput}>Rua</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('rua')}
                value={values.rua}
                onBlur={() => {
                  setFieldTouched('rua');
                }}
                placeholder="Ex. Av. fim do Mundo"
              />
              {touched.rua && errors.rua && (
                <Text style={{fontSize: 10, color: 'red'}}>{errors.rua}</Text>
              )}

              <Text style={styles.textInput}>País</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('pais')}
                value={values.pais}
                onBlur={() => setFieldTouched('pais')}
                placeholder="Ex. Brazil"
              />
              {touched.pais && errors.pais && (
                <Text style={{fontSize: 10, color: 'red'}}>{errors.pais}</Text>
              )}

              <Text style={styles.textInput}>Estado</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('estado')}
                value={values.estado}
                onBlur={() => setFieldTouched('estado')}
                placeholder="Ex.  Acre"
              />
              {touched.estado && errors.estado && (
                <Text style={{fontSize: 10, color: 'red'}}>
                  {errors.estado}
                </Text>
              )}

              <Text style={styles.textInput}>Cidade</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('cidade')}
                value={values.cidade}
                onBlur={() => setFieldTouched('cidade')}
                placeholder="Ex. Hellcife"
              />
              {touched.cidade && errors.cidade && (
                <Text style={{fontSize: 10, color: 'red'}}>
                  {errors.cidade}
                </Text>
              )}

              <Text style={styles.textInput}>Número</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('numero')}
                value={values.numero}
                onBlur={() => setFieldTouched('numero')}
                placeholder="Ex. 404"
              />
              {touched.numero && errors.numero && (
                <Text style={{fontSize: 10, color: 'red'}}>
                  {errors.numero}
                </Text>
              )}

              <TouchableOpacity
                style={styles.submitButton}
                disabled={!isValid}
                onPress={handleSubmit}>
                <Text style={styles.submitText}> Confirmar </Text>
              </TouchableOpacity>
            </Fragment>
          )}
        </Formik>
      </ScrollView>
    );
  }

  procurar_cep(cep) {
    //console.log(cep)
    if (cep) {
      axios
        .get('https://viacep.com.br/ws/' + cep + '/json')
        .then(response => {
          //console.log(response.data)
          if (!response.data.error) {
            this.setState({rua: response.data.logradouro});
            this.setState({cidade: response.data.localidade});
            this.setState({estado: response.data.uf});
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  Register(values) {
    const {params} = this.props.navigation.state;
    let cep = this.cepField.getRawValue();
    this.setState({cepunmasked: cep});
    if (this.state.cepunmasked) {
      if (params) {
        http
          .post(
            '/patient/register?',
            querystring.stringify({
              name: params.values.nome,
              sex: params.values.sexo,
              telephone: params.telefoneunmasked,
              occupation: params.values.ocupacao,
              address: values.rua,
              city: values.cidade,
              country: values.estado,
              state_province: values.pais,
              zip: this.state.cepunmasked,
              password: params.values.senha,
              birthday: moment(params.values.idade, [
                'DD-MM-YYYY',
                'YYYY-MM-DD',
              ])
                .utc()
                .format('YYYY-MM-DD'),
              email: params.values.email,
            }),
          )
          .then(response => {
            if (response.data.access_token) {
              this.props.navigation.navigate('Login',{user: 'patient'});
            }
          })
          .catch(error => {
            console.log(error.response);
          });
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    marginBottom: 50,
  },
  textInput: {
    color: '#FF5F54',
    fontSize: 20,
    marginTop: 30,
    marginBottom: 5,
    marginLeft: 60,
  },
  input: {
    height: 40,
    marginLeft: 60,
    marginRight: 60,
    borderBottomColor: '#FF5F54',
    borderBottomWidth: 3,
  },
  submitButton: {
    backgroundColor: '#FF5F54',
    alignSelf: 'center',
    marginTop: 50,
    height: 50,
    width: '45%',
    justifyContent: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 21,
    alignSelf: 'center',
  },
});
