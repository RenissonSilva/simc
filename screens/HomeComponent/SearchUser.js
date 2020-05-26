import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import http from '../../services/axiosconf';
import { ListItem, SearchBar } from 'react-native-elements';
//import { useNavigation } from '@react-navigation/native';
import Loading from '../Loading';

SearchUser.navigationOptions={
    title: 'Search',
    headerStyle: {backgroundColor: '#FF5F54'},
    headerTintColor: 'white',
}

export default function SearchUser({navigation}) {

    //const navigation = useNavigation();

    const [user, setUser ] = useState(true);
    const [loading, setLoading ] = useState(false);
    const [token, setToken ] = useState(true);
    const [ patients, setPatients] = useState(0);
    const [ patientsBackup, setPatientsBackup ] = useState(0);
    const [ valueInput, setValueInput] = useState(true);

    async function getPatients(user, token) {
        await http.get('/' + user + '/patient',{
            headers: {
                'Accept': 'aplication/json',
                'Authorization': token
            }
        })
        .then( res => {
            setLoading(false);
            setPatients(res.data)
            setPatientsBackup(res.data);
        })
        .catch(error => {
            console.log('Error get Users',error);
        })
    }

    useEffect(() => {
        if(!patients){
            setLoading(true);
            AsyncStorage.multiGet(['Token', 'User'])
            .then( res => {
                setUser(res[1][1])
                setToken(res[0][1])
            })
            .catch(error => {
                console.log('Error Get user, Token', error);
            })
            getPatients(user,token);
        }
    });

    function searchFilterFunction(text) {
        
        setValueInput(text);
        const newData = patientsBackup.filter(item => {
          const itemData = `${item.name.toUpperCase()}`;
          const textData = text.toUpperCase();
    
          return itemData.indexOf(textData) > -1;
        });
        setPatients(newData);
    };

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
    if(loading){
        return(
            <Loading/>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={patients}
                renderItem={({ item }) => (
                <ListItem
                    //leftAvatar={require('../../images/sad.png')}
                    title={`${item.name}`}
                    onPress={() => navigation.navigate(navigation.state.params.nextPage, {userName: item.name , userId: item.id})}
                />
                )}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={renderSeparator}
                ListHeaderComponent={
                    <SearchBar
                        placeholder="Click Aqui..."
                        lightTheme
                        round
                        onChangeText={text => searchFilterFunction(text)}
                        autoCorrect={false}
                        value={valueInput}
                    />
                }
            />
        </View>
    );
}
