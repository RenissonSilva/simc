import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Image, TouchableOpacity, Text, View, ImageBackground } from 'react-native';

export default class App extends React.Component {
  static navigationOptions = {
      headerTitle:'Paciente - Renato',
      headerStyle: { backgroundColor: '#FF5F54' },
      headerTintColor: 'white',
  }
  render() {
    return (
      <View style={styles.container}>
            <Text style={styles.title}>Familiares cadastrados</Text>
            <Image style={styles.sadIcon} source={require('../images/sad.png')} />
            <Text style={styles.msgEmpty}>No momento não há</Text>
            <Text style={styles.title}>Convites</Text>

            <View style={styles.boxFamiliar}>
              <Image style={styles.imgProfile} source={require('../images/profileRelative.jpg')} />
              <View style={styles.boxFamiliarText}>
                <Text style={styles.msg}>Júlia é sua irmã ?</Text>
                <View style={styles.buttons}>
                <TouchableOpacity style={styles.check} onPress = {() => { this.props.navigation.navigate('PatientLogin')}}
                    ><Image style={styles.imgAccept} source={require('../images/accept.png')} />       
                </TouchableOpacity>
                <TouchableOpacity style={styles.check} onPress = {() => { this.props.navigation.navigate('PatientLogin')}}
                    ><Image style={styles.imgDenied} source={require('../images/denied.png')} />       
                </TouchableOpacity>
                </View>
              </View>
            </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  title:{
    marginTop:20,
    marginLeft:40,
    paddingBottom:10,
    fontSize:22,
    color:'#FF5F54',
    fontWeight:'bold',
  },
  msgEmpty:{
    marginBottom:50,
    fontSize:19,
    color:'#FF5F54',
    fontWeight:'bold',
    alignSelf:'center',
  },
  sadIcon:{
    alignSelf:'center',
    marginTop:50,
    marginBottom:10,
    width:60,
    height:60,
  },
  boxFamiliar:{
    backgroundColor:'#FF5F54',
    width:'80%',
    height:100,
    borderRadius:20,
    alignSelf:'center',
    flexDirection:'row',
  },
  boxFamiliarText:{
    marginLeft:10,
    width:'60%',
  },
  imgProfile:{
    borderRadius:40,
    borderColor:'white',
    borderWidth:2,
    marginLeft:20,
    marginTop:10,
    width:80,
    height:80,
  },
  msg:{
    marginTop:15,
    fontSize:19,
    color:'white',
    fontWeight:'bold',
    alignSelf:'center',
  },
  check:{
    backgroundColor:'white',
    width:90,
    height:35,
    marginTop:15,
    borderRadius:10,
    justifyContent:'center',
  },
  buttons:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  imgAccept:{
    width:28,
    height:28,
    alignSelf:'center',
  },
  imgDenied:{
    width:20,
    height:20,
    alignSelf:'center',
  },
});