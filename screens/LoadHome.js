import React, { Component } from 'react';

import { View, Text, StyleSheet, Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';
import NetInfo from "@react-native-community/netinfo";

export default class LoadHome extends Component {

    static navigationOptions = {
        headerShown: false
    }

    constructor(props){
        super(props);
        this.state = {isConnected: false}
    }
    
    componentDidMount(){
        NetInfo.fetch().then(state => {
            state.isConnected ? this.setState({isConnected: state.isConnected}) : console.log("Is connected?", this.state.isConnected);
        });

        AsyncStorage.getItem('Token').then( evt => {
             if(evt == null || !this.state.isConnected){
                this.props.navigation.navigate('Home')
             }
             else{
                this.props.navigation.navigate('PatientHome')
            }
        })
        
    }
    render() {
        return (
            <View style={styles.background}>
                <LottieView source={require('../27-loading.json')} autoPlay loop />
            </View>
        );
    }



}


const styles = StyleSheet.create({
    background:{
        backgroundColor:'#FF5F54',
    }

})