import React, { Component } from 'react';
import LottieView from 'lottie-react-native';
import { View } from 'react-native';


export default class Loading extends Component {
  render() {
    return (
        <LottieView 
            source={require('../lf30_editor_iob6yv.json')}
            autoPlay
            loop
        /> 
    );
  }
}
