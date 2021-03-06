import React, { Component } from 'react';
import styles from '../HomeComponent/style';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, FlatList, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import GoogleFit, { Scopes } from 'react-native-google-fit';
import moment from 'moment-timezone';
import * as RNLocalize from "react-native-localize";
import AsyncStorage from '@react-native-community/async-storage';
import Loading from  '../Loading';
import http from '../../services/axiosconf';
import CompLineChart from './CompLineChart';
import querystring from 'query-string';
import BackgroundTimer from 'react-native-background-timer';
import ListHandBook from '../HandBook/ListHandbook';
import { isInteger } from 'formik';
import { ListItem } from 'react-native-elements';

export default class HomeScreen extends Component {

    static navigationOptions = {
        title: 'Home',
    };
    
    constructor(props){
        super(props);
        this.state = {handbooks: [],authorize: false, heartdata: '', date_end: '', loading: false, user: '', token: '', date_start: '', data_line_chart: [], token: '', user: '', userid: '' }

    }
    componentWillUnmount(){
        BackgroundTimer.stopBackgroundTimer();
    }
    componentDidMount(){
        console.log('Date',moment(new Date()).tz( RNLocalize.getTimeZone() ).format() );
        console.log('Fuso ',RNLocalize.getTimeZone() );
        AsyncStorage.multiGet(['Token', 'User','UserId']).then(
            res => {
                //console.log((res === null) ? true : false );
                if (res !== null){
                    console.log('logado');
                    this.setState({
                        token: res[0][1],
                        user: res[1][1],
                        userid: res[2][1]
                    })
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
                    this.setState({authorize: authResult.success})
                    this.setState({date_end: moment(new Date()).tz( RNLocalize.getTimeZone() ).format() });
                    this.setState({date_start: moment(new Date()).subtract({h:2}).tz( RNLocalize.getTimeZone() ).format() });
                   
                const options = {
                    startDate: this.state.date_start, // required
                    endDate: this.state.date_end, // required
                }
                const callback = ( (error, response) =>{
                    console.log('error google fit',error);
                    if(response){
                        this.setState({
                            data_line_chart : []
                        });

                        for( let i = 0; i < response.length ; i++){
                            this.setState({
                                data_line_chart : [...this.state.data_line_chart, response[i].value]
                            })
                        }
                        this.setState({heartdata: response[response.length - 1 ]})
                        
                        if(this.state.user && this.state.token){
                             http.post('/'+ this.state.user + '/register/heart',querystring.stringify({
                                patient_id: this.state.userid,
                                date_measurement: moment(response[response.length - 1].endDate).tz( RNLocalize.getTimeZone() ).format('YYYY-MM-DD hh:mm:ss') ,
                                heart: response[response.length - 1].value
                            }),{
                                headers:{
                                    'Accept': 'application/json',
                                    'Authorization': this.state.token
                                }
                            })
                            .then(res => {
                                console.log(res.data)
                            })
                            .catch(error => {
                                console.log(error);
                            })
                           http.get('/'+ this.state.user + '/register/getheart',{
                                headers:{
                                    'Accept': 'application/json',
                                    'Authorization': this.state.token
                                }
                            })
                            .then(res => {
                                for(var z = 0; z < res.data.length; z++){
                                    //console.log(res.data[z].heart_rate)
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            })
                        }
                    }
                    console.log(response);
                });

                GoogleFit.getHeartRateSamples(options, callback);

                BackgroundTimer.runBackgroundTimer(() => { 
                    console.log('atualizando heart rate');
                    GoogleFit.getHeartRateSamples(options, callback);
                }, 1800000);
                
               
            
            } else {
                dispatch("AUTH_DENIED", authResult.message);
            }
        })
        .catch((error) => {
            //dispatch("AUTH_ERROR");
            console.log('error',error);
        })
        

    }
 
    getHeartData = () => {
        this.setState({date_end: moment(new Date()).tz( RNLocalize.getTimeZone() ).format() });
        const options = {
            startDate: "2017-01-01T00:00:17.971Z",
            endDate: this.state.date_end, 
        }
        const callback = ((error, response) => {
            if(response){
                this.setState({heartdata: response[response.length - 1 ] })
            }
        });
        if(this.state.authorize){
            GoogleFit.getHeartRateSamples(options, callback);
        }

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
                    <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
                        <SafeAreaView>
                        <TouchableOpacity style={styles.btn} onPress={ this.getHeartData }>
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
                        { this.state.data_line_chart && (
                            <View  style={styles.grafico} >
                                <CompLineChart data={ (this.state.data_line_chart.length > 0 ) ? this.state.data_line_chart : [0,0,0,0,0] }/>  
                            </View>
                        )}
                        <View style={{marginLeft: '10%', marginRight: '10%', marginTop: '2%', marginBottom: '3%'}} >
                            <ListHandBook/>
                        </View>
                        
                        </SafeAreaView>
                    </ScrollView>

            );

        }
    }

}
