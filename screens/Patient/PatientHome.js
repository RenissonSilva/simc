import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Button,
  View,
  Text,
  Image,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../HomeComponent/HomeScreen';
import ChatScreen from '../HomeComponent/ChatSreen';
import ProfileScreen from '../HomeComponent/ProfileScreen';
import RelativeScreen from '../HomeComponent/RelativeScreen';


const Stack = createMaterialTopTabNavigator();
export default class PatientHome extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          tabBarOptions={{
            activeTintColor: '#FF5F54',
            inactiveTintColor: '#CCCCCC',
            labelStyle: {
              fontSize: 13,
            },
            indicatorStyle: {
              backgroundColor: '#FF5F54',
            },
          }}>
          <Stack.Screen name="Status" component={HomeScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Perfil" component={ProfileScreen} />
          <Stack.Screen name="Familiares" component={RelativeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  teste: {
    flexDirection: 'row',
  },
  btn: {
    justifyContent: 'center',
    width: '75%',
    height: 110,
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FF5F54',
    alignSelf: 'center',
  },
  btnText: {
    marginLeft: 30,
    color: '#FF5F54',
    fontSize: 16,
  },
  btnBpm: {
    marginLeft: 50,
    color: '#FF5F54',
    fontSize: 40,
    fontWeight: 'bold',
  },
  icon: {
    alignSelf: 'center',
    marginRight: '15%',
    alignSelf: 'flex-end',
    position: 'absolute',
  },
  monitora: {
    color: '#8B8B8B',
    fontSize: 16,
    alignSelf: 'center',
  },
  btnB: {
    color: '#FF5F54',
    fontSize: 21,
    alignSelf: 'flex-end',
    marginLeft: 5,
  },
  imgProfile: {
    borderRadius: 80,
    width: 160,
    height: 160,
    alignSelf: 'center',
    marginTop: 40,
    borderColor: '#FF5F54',
    borderWidth: 2,
  },
  nome: {
    fontSize: 30,
    color: '#FF5F54',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  ano: {
    fontSize: 28,
    color: '#FF5F54',
    alignSelf: 'center',
  },
  info: {
    marginTop: 10,
    paddingBottom: 10,
    fontSize: 22,
    color: '#FF5F54',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  dado: {
    fontSize: 20,
    color: '#FF5F54',
  },
  imgIcon: {
    width: 30,
    height: 30,
    margin: 10,
  },
  infoIcon: {
    flexDirection: 'row',
  },
  containerDados: {
    alignSelf: 'center',
  },
  //Relative
  title: {
    marginTop: 20,
    marginLeft: 40,
    paddingBottom: 10,
    fontSize: 22,
    color: '#FF5F54',
    fontWeight: 'bold',
  },
  msgEmpty: {
    marginBottom: 50,
    fontSize: 19,
    color: '#FF5F54',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  sadIcon: {
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 10,
    width: 60,
    height: 60,
  },
  boxFamiliar: {
    backgroundColor: '#FF5F54',
    width: '80%',
    height: 100,
    borderRadius: 20,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  boxFamiliarText: {
    marginLeft: 10,
    width: '60%',
  },
  imgProfileRelative: {
    borderRadius: 40,
    borderColor: 'white',
    borderWidth: 2,
    marginLeft: 20,
    marginTop: 10,
    width: 80,
    height: 80,
  },
  msg: {
    marginTop: 15,
    fontSize: 19,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  check: {
    backgroundColor: 'white',
    width: 90,
    height: 35,
    marginTop: 15,
    borderRadius: 10,
    justifyContent: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imgAccept: {
    width: 28,
    height: 28,
    alignSelf: 'center',
  },
  imgDenied: {
    width: 20,
    height: 20,
    alignSelf: 'center',
  },
});
