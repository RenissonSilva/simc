import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import 'react-native-gesture-handler';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './screens/HomeScreen';
import Choice from './screens/Choice';
import ChoiceRegis from './screens/ChoiceRegis';
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
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);
