import React, { Component } from 'react';

import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';
// import { Container } from './styles';

export default class LoadHome extends Component {

    static navigationOptions = {
        headerShown: false
    }

    
    componentDidMount(){
        AsyncStorage.getItem('Token').then( evt => {
             if(evt == null){
                this.props.navigation.navigate('Home')
             }
             else{
                this.props.navigation.navigate('PatientHome')
             }
        })
    }
    render() {
        return (
            <LottieView source={require('../27-loading.json')} autoPlay loop />
        );
    }
}
