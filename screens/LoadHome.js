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
        this.state = {isConnected: false, token: '', user: ''}
    }
    
    componentDidMount(){
        this.animation.play();
        NetInfo.fetch().then(state => {
            state.isConnected ? this.setState({isConnected: state.isConnected}) : console.log("Is connected?", this.state.isConnected);
        });

        AsyncStorage.multiGet(['Token','User']).then( evt => {

            (evt[0][1] && evt[1][1] && this.state.isConnected ) ? this.props.navigation.navigate('PatientHome') : this.props.navigation.navigate('Home')
            //console.log(evt[0][1],evt[1][1]);
             if(evt == null || !this.state.isConnected){
                //this.props.navigation.navigate('Home')
                
             }
             else{
                //this.props.navigation.navigate('PatientHome')
            }
        })
    }
    checkToken(user, token){
        
    }
    render() {
        return (
           <LottieView ref={animation => {
                this.animation = animation;
            }}
            source={require('../lf30_editor_iob6yv.json')}
            /> 
        );
    }



}


const styles = StyleSheet.create({
    background:{
        backgroundColor:'#FF5F54',
    }

})