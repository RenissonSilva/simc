import React from 'react';

import { View,Text } from 'react-native';
import axios from 'axios';
import querystring from 'query-string';
 
export default class PatientHome extends React.Component {

    constructor(props){
        super(props)
        this.state = {data: null};
        this.state = {dataerror: null};
    }
    componentDidMount() {
        const { params } = this.props.navigation.state;
        console.log(params.token);

        if(params){
            axios.defaults.headers.common.accept = 'application/json';            

            axios.get('https://apisimc.herokuapp.com/api/patient/detail', { 
                headers: {"Authorization": params.token}
            }
            )
            .then( res => { 
                this.state.data =  res.data;
                console.log(this.state.data)
            })
            .catch( error => { 
                this.state.dataerror = error
                console.log(this.state.dataerror)
                if(this.state.dataerror){
                    this.props.navigation.goBack();
                }
             })
        }
    }

    render() {
        return (
            <View>
                <Text> PacienteHome </Text>
            </View>
        );
    }
}
