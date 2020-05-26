import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, SafeAreaView, VirtualizedList, Fragment} from 'react-native';
import moment from 'moment-timezone';
import style from './style';
import { ListItem } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import TouchableScale from 'react-native-touchable-scale';

export default function ListHandbook({data}){

    const [data_handbook, setData_handbook ] = useState(true);

    useEffect(() => {
        if(data.length != 0){
            setData_handbook(data);
            console.log(data_handbook);
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
