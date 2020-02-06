import React, { Component } from 'react';
import { StyleSheet, Button, Alert, Text, View, ImageBackground } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <ImageBackground source={require('./images/watch.jpeg')} style={styles.container}>
      <View style={styles.btns}>
        <Button 
          title="Cadastrar"
          color="#FF5F54"
          onPress={() => Alert.alert('Funcionando :)')}
        />
         <Button
          title="Entrar"
          color="#FF5F54"
          onPress={() => Alert.alert('Funcionando tbm :)')}
        />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'flex-end',
  },
  btns:{
    flexDirection:'row',
    margin:10,
  },
});