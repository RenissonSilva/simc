import React from 'react';

import { View, Text } from 'react-native';
import axios from 'axios';


export default class RelativeHome extends React.Component {

  constructor(props){
    super(props)
    this.state = {data: null};
    this.state = {dataerror: null};
  }

  next(item){
    this.props.navigation.navigate('PatientHome', {token: item} )
  };

  componentDidMount(){
    const { params } = this.props.navigation.state;
    console.log(params.token);

    if(params){
        axios.defaults.headers.common.accept = 'application/json';            

        axios.get('https://apisimc.herokuapp.com/api/relative/detail', { 
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
            <Text> RelativeHome</Text>
        </View>
    );
  }
}
