import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import 'react-native-gesture-handler';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import Choice from './screens/Choice';
import ChoiceRegis from './screens/Register/ChoiceRegis';
import PatientRegister from './screens/Register/PatientRegister1';
import PatientRegister2 from './screens/Register/PatientRegister2';
import RelativeRegister from './screens/Register/RelativeRegister1';
import RelativeRegister2 from './screens/Register/RelativeRegister2';
import DoctorRegister from './screens/Register/DoctorRegister';
import Login from './screens/Login';
import LoadHome from './screens/LoadHome';
import Home from './screens/HomeScreen';
import {AsyncStorage} from '@react-native-community/async-storage';

//Patient
import HomeScreen from './screens/Patient/HomeScreen';
import ChatScreen from './screens/Patient/PatientChat';
import RelativeScreen from './screens/HomeComponent/RelativeScreen';

//Doctor
import DoctorHome from './screens/Doctor/DoctorHome';
import DoctorChat from './screens/Doctor/ChatScreen';


//Relative
import RelativeHome from './screens/Relative/RelativeHome';
import RelativeChat from './screens/Relative/ChatScreen';


import ProfileScreen from './screens/HomeComponent/ProfileScreen';

export default class App extends React.Component {

  render() {
    return (
      <AppContainer/> 
    );
  }
}
const relative = createMaterialTopTabNavigator(
  {
    RelativeHome : RelativeHome,
    ProfileScreen: ProfileScreen,
    RelativeChat: RelativeChat,
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
  
)
const doctor = createMaterialTopTabNavigator(
  {
    DoctorHome: DoctorHome,
    ProfileScreen: ProfileScreen,
    DoctorChat: DoctorChat,
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

const patient = createMaterialTopTabNavigator(
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
    patient: patient,
    doctor: doctor,
    relative: relative,

  },
  {
    initialRouteName: 'LoadHome'
  }

)

const AppContainer = createAppContainer(Root);
