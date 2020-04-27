import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import http from '../../services/axiosconf';
import { ListItem, SearchBar } from 'react-native-elements';

SearchUser.navigationOptions={
    title: 'Search'
}

export default function SearchUser(props) {

    const [user, setUser ] = useState(true);
    const [token, setToken ] = useState(true);
    const [ patients, setPatients] = useState(0);
    const [ value, setValue] = useState(true);

    async function getPatients(user, token) {
        await http.get('/' + user + '/patient',{
            headers: {
                'Accept': 'aplication/json',
                'Authorization': token
            }
        })
        .then( res => {
            setPatients(res.data)
            //console.log(res.data);
        })
        .catch(error => {
            console.log('Error get Users',error);
        })
    }

    useEffect(() => {
        AsyncStorage.multiGet(['Token', 'User'])
            .then( res => {
                setUser(res[1][1])
                setToken(res[0][1])
            })
            .catch(error => {
                console.log('Error Get user, Token', error);
        })
        getPatients(user,token);
    });

    function SearchHeader() {
        return(
            <SearchBar
                placeholder="Type Here..."
                lightTheme
                round
                onChangeText={text => setValue(text)}
                autoCorrect={false}
                value={value}
            />
        )
    }
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
        <View style={{ flex: 1 }}>
            <FlatList
                data={patients}
                renderItem={({ item }) => (
                <ListItem
                    //leftAvatar={require('../../images/sad.png')}
                    title={`${item.name}`}
                />
                )}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={renderSeparator}
                ListHeaderComponent={SearchHeader}
            />
        </View>
    );
}
