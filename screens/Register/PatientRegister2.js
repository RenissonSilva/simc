import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,ScrollView } from 'react-native';
import axios from 'axios';
import querystring from 'query-string';
import moment from 'moment';

export default class PatientLogin extends Component {

static navigationOptions = {
      headerTitle:'Endereço',
      headerStyle: { backgroundColor: '#FF5F54' },
      headerTintColor: 'white',
  }
      // <Image style={styles.imgLogo} source={require('../images/whiteLogo.png')} />
  
  constructor(props) {
    super(props);
    this.state = {cep: ''};
    this.state = {rua: ''};
    this.state = {cidade: ''};
    this.state = {estado: ''};
    this.state = {pais: ''};
    this.state = {numero: ''};
    this.state = {complemento: ''};
  }
  componentDidMount(){
    //const { params } = this.props.navigation.state;
    //console.log(params.idade);
    moment.locale('pt-BR');
    //console.log(moment(params.idade).isValid());
    //console.log(moment(params.idade,['DD-MM-YYYY','YYYY-MM-DD']).utc().format('YYYY-MM-DD'));
  
  }

  render() {
    return (
        <ScrollView style={styles.scrollView}>
          <Text style={styles.textInput}>CEP</Text>
          <TextInput
            style={styles.input}
            onChangeText={(cep) => {
              this.setState({cep})
            }}
            value={this.state.cep}
            onBlur= {this.procurar_cep}
            maxLength = {8}
          />
          <Text style={styles.textInput}>Rua</Text>
          <TextInput
            style={styles.input}
            onChangeText={(rua) => this.setState({rua})}
            value={this.state.rua}
          />
          <Text style={styles.textInput}>País</Text>
          <TextInput
            style={styles.input}
            onChangeText={(pais) => this.setState({pais})}
            value={this.state.pais}
          />
          <Text style={styles.textInput}>Estado</Text>
          <TextInput
            style={styles.input}
            onChangeText={(estado) => this.setState({estado})}
            value={this.state.estado}
          />
          <Text style={styles.textInput}>Cidade</Text>
          <TextInput
            style={styles.input}
            onChangeText={(cidade) => this.setState({cidade})}
            value={this.state.cidade}
          />
          <Text style={styles.textInput}>Número</Text>
          <TextInput
            style={styles.input}
            onChangeText={(numero) => this.setState({numero})}
            value={this.state.numero}
          />
          <Text style={styles.textInput}>Complemento</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            onChangeText={(complemento) => this.setState({complemento})}
            value={this.state.complemento}
          />

          <TouchableOpacity
               style = {styles.submitButton}
               onPress = {this.Register}>
               <Text style = {styles.submitText}> Confirmar </Text>
            </TouchableOpacity>
          
        </ScrollView>

    );
  }

  procurar_cep = () => {
    if(this.state.cep){
      axios.get('https://viacep.com.br/ws/'+this.state.cep+'/json')
      .then( response => {
        //console.log(response.data)
        if(!response.data.error){
          this.setState({rua: response.data.logradouro})
          this.setState({cidade: response.data.localidade})
          this.setState({estado: response.data.uf})
        }
       
      })
      .catch( error => {
        console.log(error)
      })
    }
  }

  Register = () => {
    const { params } = this.props.navigation.state;
    //console.log(params);
    //console.log(this.state)
    if(params){
      axios.post('https://apisimc.herokuapp.com/api/patient/register?', querystring.stringify({
        name: params.nome,
        sex: params.sexo,
        telephone: params.telefone,
        occupation: params.ocupacao,
        address: this.state.rua,
        city: this.state.cidade,
        country: this.state.estado,
        state_province: this.state.pais,
        zip: this.state.cep,
        password: params.senha,
        birthday: moment(params.idade,['DD-MM-YYYY','YYYY-MM-DD']).utc().format('YYYY-MM-DD'),
        email: params.email
      }))
      .then(response => {
        //console.log(response.data)
        if(response.data.access_token){
          this.props.navigation.navigate('PatientLogin', {token: item} )
        }
      })
      .catch(error => {
        console.log(error)
      })
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
});