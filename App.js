import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import 'react-native-gesture-handler';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './screens/HomeScreen';
import Choice from './screens/Choice';
import PatientLogin from './screens/PatientLogin';
import RelativeLogin from './screens/RelativeLogin';
import DoctorLogin from './screens/DoctorLogin';
import PatientHome from './screens/Patient/PatientHome';
import RelativeHome from './screens/Relative/RelativeHome';
import ChoiceRegis from './screens/Register/ChoiceRegis';
import PatientRegister from './screens/Register/PatientRegister1';
import PatientRegister2 from './screens/Register/PatientRegister2';
import RelativeRegister from './screens/Register/RelativeRegister1';
import RelativeRegister2 from './screens/Register/RelativeRegister2';
import DoctorRegister from './screens/Register/DoctorRegister';
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
    PatientLogin : PatientLogin,
    RelativeLogin : RelativeLogin,  
    DoctorLogin : DoctorLogin,
    PatientHome : PatientHome,
    RelativeHome: RelativeHome,
    ChoiceRegis : ChoiceRegis,
    PatientRegister : PatientRegister,
    PatientRegister2 : PatientRegister2,
    RelativeRegister : RelativeRegister,
    RelativeRegister2 : RelativeRegister2,
    DoctorRegister : DoctorRegister,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);
