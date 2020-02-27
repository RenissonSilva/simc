import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,ScrollView, Picker } from 'react-native';
import axios from 'axios';
import querystring from 'query-string';
import validate from 'validate.js';
import { TextInputMask } from 'react-native-masked-text'
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
    this.state = {nome: ''};
    this.state = {idade: ''};
    this.state = {sexo: ''};
    this.state = {telefone: ''};
    this.state = {email: ''};
    this.state = {ocupacao: ''};
    this.state = {senha: ''};
    this.state = {confirmSenha: ''};
    this.state = {nameerror: ''};
  }

  render() {
    return (
        <ScrollView style={styles.scrollView}>
        

          <Text style={styles.textInput}>Nome</Text>
          <TextInput
            style={styles.input}
            onChangeText={(nome) => this.setState({nome})}
            value={this.state.nome}
            onEndEditing = {this.validar}
          />
          <Text>{this.state.nameerror}</Text>

          <Text style={styles.textInput}>Idade</Text>
          <TextInputMask
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY'
            }}
            style={styles.input}
            onChangeText={(idade) => this.setState({idade})}
            value={this.state.idade}
          />

          <Text style={styles.textInput}>Sexo</Text>
          <Picker
            selectedValue={this.state.sexo}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({sexo: itemValue})
            }>
            <Picker.Item label="Escolha uma opção" value="" />
            <Picker.Item label="Masculino" value="Male" />
            <Picker.Item label="Feminino" value="Female" />
            <Picker.Item label="Outros" value="Another" />
          </Picker>

          <Text style={styles.textInput}>Telefone</Text>
          <TextInput
            style={styles.input}
            onChangeText={(telefone) => this.setState({telefone})}
            value={this.state.telefone}
          />

          <Text style={styles.textInput}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
          />

          <Text style={styles.textInput}>Ocupação</Text>
          <TextInput
            style={styles.input}
            onChangeText={(ocupacao) => this.setState({ocupacao})}
            value={this.state.ocupacao}
          />

          <Text style={styles.textInput}>Senha</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            onChangeText={(senha) => this.setState({senha})}
            value={this.state.senha}
          />

          <Text style={styles.textInput}>Confirmação de senha</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            onChangeText={(confirmSenha) => this.setState({confirmSenha})}
            value={this.state.confirmSenha}
          />

          <TouchableOpacity style={styles.submitButton} onPress = {this.continue_register}
            >
               <Text style = {styles.submitText}> Continuar </Text>
          </TouchableOpacity>
        </ScrollView>

    );
  }

  continue_register = () => {
    //console.log(this.state)
    console.log(validate({nome: this.state.nome}, validation) )
    if(moment(this.state.idade).isValid() ){
      this.props.navigation.navigate('PatientRegister2',this.state);
    }
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