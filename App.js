import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import 'react-native-gesture-handler';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import Choice from './screens/Choice';
import PatientHome from './screens/Patient/PatientHome';
import RelativeHome from './screens/Relative/RelativeHome';
import ChoiceRegis from './screens/Register/ChoiceRegis';
import PatientRegister from './screens/Register/PatientRegister1';
import PatientRegister2 from './screens/Register/PatientRegister2';
import RelativeRegister from './screens/Register/RelativeRegister1';
import RelativeRegister2 from './screens/Register/RelativeRegister2';
import DoctorRegister from './screens/Register/DoctorRegister';
import Login from './screens/Login';
import LoadHome from './screens/LoadHome';
import Home from './screens/HomeScreen';
import { isSignedIn } from './services/auth';
import {AsyncStorage} from '@react-native-community/async-storage';
import HomeScreen from './screens/HomeComponent/HomeScreen';
import ProfileScreen from './screens/HomeComponent/ProfileScreen';
import ChatScreen from './screens/HomeComponent/ChatSreen';
import RelativeScreen from './screens/HomeComponent/RelativeScreen';


export default class App extends React.Component {

  render() {
    return (
      <AppContainer/> 
    );
  }
}

const Stack = createMaterialTopTabNavigator(
  {
    HomeScreen: HomeScreen,
    ProfileScreen: ProfileScreen,
    ChatScreen: ChatScreen,
    RelativeScreen: RelativeScreen,
  },
  {
    tabBarOptions: {
      labelStyle: {
        fontSize: 16,
      },
      tabStyle: {
        width: 100,
      },
      style: {
        backgroundColor: '#FF5F54',
      },
    },
    swipeEnabled: true

  }
);

const RootStack = createStackNavigator(
  {
    Home: Home,
    Choice: Choice,
    RelativeHome: RelativeHome,
    ChoiceRegis: ChoiceRegis,
    PatientRegister: PatientRegister,
    PatientRegister2: PatientRegister2,
    RelativeRegister: RelativeRegister,
    RelativeRegister2: RelativeRegister2,
    DoctorRegister: DoctorRegister,
    Login: Login,
  }
);




const Root = createSwitchNavigator(
  {
    LoadHome: LoadHome,
    RootStack: RootStack,
    Stack: Stack,
  },
  {
    initialRouteName: 'LoadHome'
  }

)

const AppContainer = createAppContainer(Root);
