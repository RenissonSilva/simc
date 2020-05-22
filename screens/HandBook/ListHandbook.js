import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import moment from 'moment-timezone';
import { ListItem } from 'react-native-elements';

export default function ListHandbook({data}){

    const [data_handbook, setData_handbook ] = useState(true);

    useEffect(() => {
        if(data.length != 0){
            setData_handbook(data);
        } 
        console.log(data_handbook);
    })
  return (
    <View>
        <FlatList
        data={data_handbook}
        renderItem={({item}) => 
            <TouchableOpacity>
                <Text>Prontuario: {item.name_handbook.toString()} </Text>
                <View>
                    <Text>Doutor: {item.doctor_name.toString()} </Text>
                    <Text>Data: {moment(item.service_date).format('DD/MM/YYYY').toString()} </Text>
                </View>
            </TouchableOpacity>
        }
        keyExtractor={item => item.id}
        />
    </View>
  );
}
