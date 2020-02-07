import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, TextInput,SubmitButton, TouchableOpacity } from 'react-native';

export default class PatientLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {email: ''};
    this.state = {senha: ''};
  }

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
            onChangeText={(senha) => this.setState({senha})}
            value={this.state.senha}
          />
          <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.login(this.state.email, this.state.senha)
               }>
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