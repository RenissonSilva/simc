import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, SafeAreaView, VirtualizedList, Fragment} from 'react-native';
import moment from 'moment-timezone';
import style from './style';
import { ListItem } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import TouchableScale from 'react-native-touchable-scale';
import http from '../../services/axiosconf';
import AsyncStorage from '@react-native-community/async-storage';

export default function ListHandbook(){

    const [data_handbook, setData_handbook ] = useState(0);
    const [user, setUser] = useState(false);
    const [token, setToken] = useState(false);
    const [userid, setUserId] = useState(true);

    async function getHandbook(){
      await AsyncStorage.multiGet(['Token', 'User','UserId']).then(
        res => {
            if(res !== null){
              setToken(res[0][1]);
              setUser(res[1][1]);
              setUserId(res[2][1]);
            }
        }
      )

      if(token && user){
        
        await http.get('/'+user+'/gethandbook',{
          headers:{
              'Accept': 'application/json',
              'Authorization': token
          }
        })
        .then(res => {
          console.log(res)
          var array_handbook = [];
            if(res.data.length > 1){
              for( let i = 0; i < res.data.length ; i++){
                array_handbook = [...array_handbook, {
                  'id':res.data[i].id.toString(),
                  'name_handbook': res.data[i].name_handbook,
                  'service_date': res.data[i].service_date,
                  'doctor_id': res.data[i].doctor_id.toString(),
                  'doctor_name': res.data[i].doctor_name,
                  'patient_id': res.data[i].patient_id
                }]
              }
              setData_handbook(array_handbook);
          }
        })
        .catch( error => {
            console.log('Error get handbook',error);
        })

      }
    }
      
    useEffect(() => {
        if(data_handbook == 0){
            getHandbook();
        } 
    })
    function renderSeparator() {
        return (
          <View
            style={{
              height: 1,
              width: '86%',
              backgroundColor: '#CED0CE',
              marginLeft: '14%',
            }}
          />
        );
    };
  return (
    <View>
        <FlatList
        
        data={data_handbook}
        renderItem={({item}) => 
            <ListItem
            Component={TouchableScale}
            style={{
                marginTop: '2%',
                borderRadius: 30
            }}
            friction={90} 
            tension={100} 
            activeScale={0.95}
            linearGradientProps={{
                colors: ['#FF5F54', '#fa776e'],
                start: { x: 1, y: 0 },
                end: { x: 0.2, y: 0 },
            }}
            ViewComponent={LinearGradient}
            title={`Nome do Prontuario: ${item.name_handbook}`}
            subtitle={`Doutor: ${item.doctor_name}        Data: ${moment(item.service_date).format('DD/MM/YYYY').toString()}`}
            titleStyle={{ color: 'white', fontWeight: 'bold' }}
            subtitleStyle={{ color: 'white' }}
            chevron={{ color: 'white' }}
            />
        }
        keyExtractor={item => item.id}
        />
    </View>
  );
}
