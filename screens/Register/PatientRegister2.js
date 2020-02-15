import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,ScrollView } from 'react-native';
import axios from 'axios';
import querystring from 'query-string';

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

  render() {
    return (
        <ScrollView style={styles.scrollView}>
          <Text style={styles.textInput}>CEP</Text>
          <TextInput
            style={styles.input}
            onChangeText={(cep) => this.setState({cep})}
            value={this.state.cep}
          />
          <Text style={styles.textInput}>Rua</Text>
          <TextInput
            style={styles.input}
            onChangeText={(rua) => this.setState({rua})}
            value={this.state.rua}
          />
          <Text style={styles.textInput}>Cidade</Text>
          <TextInput
            style={styles.input}
            onChangeText={(cidade) => this.setState({cidade})}
            value={this.state.cidade}
          />
          <Text style={styles.textInput}>Estado</Text>
          <TextInput
            style={styles.input}
            onChangeText={(estado) => this.setState({estado})}
            value={this.state.estado}
          />
          <Text style={styles.textInput}>País</Text>
          <TextInput
            style={styles.input}
            onChangeText={(pais) => this.setState({pais})}
            value={this.state.pais}
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
               onPress = {this.signIn}>
               <Text style = {styles.submitText}> Confirmar </Text>
            </TouchableOpacity>
          
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