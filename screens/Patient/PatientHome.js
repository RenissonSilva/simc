import React, { Component } from 'react';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Image, TouchableOpacity, Text, View, ImageBackground } from 'react-native';
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
            <View style={styles.container}>
        <TouchableOpacity style={styles.btn} onPress = {() => { this.props.navigation.navigate('PatientLogin')}}
            >       
          <Text style={styles.btnText}>Batimento cardíaco</Text>
          <View style={styles.teste}>
            <Text style={styles.btnBpm}>81</Text>
            <Text style={styles.btnB}>bpm</Text>
          </View>
          <Icon name="heartbeat" size={70} color="#FF5F54" style={styles.icon}/>
          <Animatable.Text animation="pulse" iterationCount={'infinite'} direction="alternate" style={styles.icon}><Icon name="heartbeat" size={70} color="#FF5F54" style={styles.icon}/></Animatable.Text>
        </TouchableOpacity>
         <Text style={styles.monitora}>Monitoramento dos últimos 30 minutos</Text>
      </View>
        );
    }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  teste:{
    flexDirection:'row',
  },
  btn:{
    justifyContent:'center',
    width:"75%",
    height: 110,
    backgroundColor:'#fff',
    margin:15,
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#FF5F54',
    alignSelf:'center',
  },
  btnText:{
    marginLeft:30,
    color:'#FF5F54',
    fontSize:16,
  },
  btnBpm:{
    marginLeft:50,
    color:'#FF5F54',
    fontSize:40,
    fontWeight:'bold',
  },
  icon:{
    alignSelf:'center',
    marginRight:'5%',
    alignSelf:'flex-end',
    position:'absolute',
  },
  monitora:{
    color:'#8B8B8B',
    fontSize:16,
    alignSelf:'center',
  },
  btnB:{
    color:'#FF5F54',
    fontSize:21,
    alignSelf:'flex-end',
    marginLeft:5,
  },

});
        // <View style={styles.topMenu}>
        //   <Icon name="arrow-left" size={40} color="#fff" style={styles.iconeSeta}/>
        //   <Text style={styles.textMenu}>Login</Text>
        //   <Image style={styles.imgLogo} source={require('../images/whiteLogo.png')} />
        // </View> 