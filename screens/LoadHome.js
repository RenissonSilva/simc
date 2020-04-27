import React, { Component } from 'react';

import { View, Text, StyleSheet, Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';
import NetInfo from "@react-native-community/netinfo";
import http from "../services/axiosconf";
import GoogleFit, { Scopes } from 'react-native-google-fit';
export default class LoadHome extends Component {

    static navigationOptions = {
        headerShown: false
    }

    constructor(props){
        super(props);
        this.state = {isConnected: false, token: '', user: '',valited: false}
    }
    
    componentDidMount(){
        this.animation.play();
        NetInfo.fetch().then(state => {
            state.isConnected ? this.setState({isConnected: state.isConnected}) : console.log("Is connected?", this.state.isConnected);
        });

        AsyncStorage.multiGet(['Token','User']).then( evt => {
            this.checkToken(evt[1][1], evt[0][1]);
            //(evt[0][1] && evt[1][1] && this.state.isConnected && this.state.valited ) ? this.props.navigation.navigate('PatientHome') : this.props.navigation.navigate('Home')
        })
    }
    checkToken(user, token){
        if(user && token && this.state.isConnected){
            http.get('/'+user+'/check',{
                headers:{
                    'Accept': 'application/json',
                    'Authorization': token
                }
            })
            .then( 
                res => {
                    if(res.data){
                        this.props.navigation.navigate(user)
                    }
                }
                )
                .catch(
                    error => {
                        //console.log("LoadHome",error.toJSON())
                        http.post('/'+user+'/logout',{},{
                            headers: {
                                'Accept': 'application/json',
                                'Authorization': token
                            }
                        }).then(res => {
                            if(res.data){
                                AsyncStorage.removeItem("Token") 
                                AsyncStorage.removeItem("User")
                                GoogleFit.disconnect()
                            }
                        })
                        .catch(
                            error => {
                                AsyncStorage.removeItem("Token") 
                                AsyncStorage.removeItem("User")
                                GoogleFit.disconnect()
                            }
                            )
                            this.props.navigation.navigate('Home')
                        }
                        )
        }
        else {
            this.props.navigation.navigate('RootStack');
        }
    }
    render() {
        return (
        
           <LottieView  style={styles.fundo} ref={animation => {
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
    },
    fundo: {
        backgroundColor: '#ffffff'
    }

})