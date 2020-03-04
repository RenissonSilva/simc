import React, { Component } from 'react';
import styles from './style';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import GoogleFit, { Scopes } from 'react-native-google-fit';
import moment from 'moment';

export default class HomeScreen extends Component {
    
    constructor(props){
        super(props);
        this.state = {authorize: false, heartdata: ''}
    }

    componentDidMount(){
        
        console.log(new Date());
        const options = {
            scopes: [
                Scopes.FITNESS_ACTIVITY_READ_WRITE,
                Scopes.FITNESS_BODY_READ_WRITE,
            ],
        }
        GoogleFit.authorize(options)
            .then(authResult => {
            console.log(authResult);
            if (authResult.success) {
            //dispatch("AUTH_SUCCESS");
            const options = {
                startDate: "2017-01-01T00:00:17.971Z", // required
                endDate: new Date().toISOString(), // required
            }
            const callback = ((error, response) => {
            console.log(error, response[0]);
            if(response){
                this.setState({authorize: authResult.success})
                this.setState({heartdata: response[0]})
                console.log(this.state);
            }
                
            });
            
            GoogleFit.getHeartRateSamples(options, callback);
            
            } else {
            //dispatch("AUTH_DENIED", authResult.message);
            }
        })
        .catch((error) => {
            //dispatch("AUTH_ERROR");
            console.log(error);
        })
    }
    
    render() {
    return (
    <View style={styles.container}>
       
       <TouchableOpacity style={styles.btn}>
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
    </View>
    );
    }
}
