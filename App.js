import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import 'react-native-gesture-handler';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './screens/HomeScreen';
import Choice from './screens/Choice';
import ChoiceRegis from './screens/ChoiceRegis';
import PatientLogin from './screens/PatientLogin';
import RelativeLogin from './screens/RelativeLogin';
import DoctorLogin from './screens/DoctorLogin';
import PatientHome from './screens/Patient/PatientHome';
import RelativeHome from './screens/Relative/RelativeHome';
export default class App extends React.Component {
  render() {
    return (
      <AppContainer/>      
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home : HomeScreen,
    Choice : Choice,
    ChoiceRegis : ChoiceRegis,
    PatientLogin : PatientLogin,
    RelativeLogin : RelativeLogin,  
    DoctorLogin : DoctorLogin,
    PatientHome : PatientHome,
    RelativeHome: RelativeHome
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);
