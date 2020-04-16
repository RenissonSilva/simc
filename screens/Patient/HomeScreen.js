import React, { Component } from 'react';
import styles from '../HomeComponent/style';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import GoogleFit, { Scopes } from 'react-native-google-fit';
import moment from 'moment';
import * as RNLocalize from "react-native-localize";
import AsyncStorage from '@react-native-community/async-storage';
import Loading from  '../Loading';
import http from '../../services/axiosconf';

export default class HomeScreen extends Component {

    static navigationOptions = {
        title: 'Home',
    };
    
    constructor(props){
        super(props);
        this.state = {authorize: false, heartdata: '', date: '', loading: false, user: '', token: ''}
    }

    componentDidMount(){
        console.log(this.props.nav);
        AsyncStorage.getItem('Token').then(
            res => {
                //console.log(res);
                //console.log((res === null) ? true : false );
                if (res !== null){
                    console.log('logado');
                }
                else{
                    //fazer redirecionamento
                    //this.props.navigation.navigate('Home')
                }
            }
            )
            const options = {
                scopes: [
                    Scopes.FITNESS_ACTIVITY_READ_WRITE,
                    Scopes.FITNESS_BODY_READ_WRITE,
                ],
            }
            GoogleFit.authorize(options)
            .then(authResult => {
            if (authResult.success) {
            //GoogleFit.openFit()
                this.setState({date: moment(new Date()).tz(RNLocalize.getTimeZone()).format() })
                const options = {
                    startDate: "2017-01-01T00:00:17.971Z", // required
                    endDate: this.state.date, // required
                }
                const callback = ((error, response) => {
                //console.log(error, response);
                if(response){
                    this.setState({authorize: authResult.success})
                    this.setState({heartdata: response[0]})
                    //console.log(this.state);
                }
            });
            
            GoogleFit.getHeartRateSamples(options, callback);
            
            } else {
                //dispatch("AUTH_DENIED", authResult.message);
            }
        })
        .catch((error) => {
            //dispatch("AUTH_ERROR");
            //console.log(error);
        })
    }


    signOut = async () => {
        this.setState({loading: true});

        await AsyncStorage.multiGet(['Token','User']).then( (evt) => {
            this.setState({token : evt[0][1]})
            this.setState({user : evt[1][1]})
        })

        http.post('/'+this.state.user+'/logout',{},{
            headers: {
                'Accept': 'application/json',
                'Authorization': this.state.token
            }
        }).then(res => {
            if(res.data){
                AsyncStorage.clear();
                GoogleFit.disconnect();
                this.props.navigation.navigate('LoadHome');
            }
        })
        .catch(
            error => {
                console.log('error signout', error);
            }
        )


    }

    
    navigate(route){
        this.props.navigation.navigate(route);
    }

    render() {
        if(this.state.loading){
            return (
                <Loading />
            )
        }
        if(!this.state.loading){
            return (
                <View style={styles.container}>
            
                <TouchableOpacity style={styles.btn} onPress={ () => this.state.authorize ? GoogleFit.getHeartRateSamples( {startDate: "2017-01-01T00:00:17.971Z", endDate: this.state.date,} , (error, res ) => { this.setState({heartdata: res[0]}) }) : console.log('Google fit error authorize')  }>
                        <Text style={styles.btnText}>Batimento cardíaco</Text>
                        { this.state.authorize &&
                            <View style={styles.teste}>
                                <Text style={styles.btnBpm}>{this.state.heartdata.value}</Text>
                                <Text style={styles.btnB}>bpm</Text>
                            </View>
                        }
                        <Icon name="heartbeat" size={70} color="#FF5F54" style={styles.icon} />
                        <Animatable.Text
                            animation="pulse"
                            iterationCount={'infinite'}
                            direction="alternate"
                            style={styles.icon}>
                            <Icon
                            name="heartbeat"
                            size={70}
                            color="#FF5F54"
                            style={styles.icon}
                            />
                        </Animatable.Text>
                    </TouchableOpacity>
                    <Text style={styles.monitora}>Monitoramento dos últimos 30 minutos</Text>

                    <TouchableOpacity
                        onPress = { this.signOut }>
                        <Text style = {styles.submitText}> Sair </Text>
                    </TouchableOpacity>
                </View>
            );

        }
    }

}
