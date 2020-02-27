import * as React from 'react';
import {StyleSheet, TouchableOpacity, Button, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createMaterialTopTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: '#FF5F54',
          inactiveTintColor: '#CCCCCC',
          labelStyle: {
            fontSize: 13,
          },
          indicatorStyle: {
            backgroundColor: '#FF5F54',
          },
        }}>
        <Stack.Screen name="Status" component={HomeScreen} />
        <Stack.Screen name="Chat" component={DetailsScreen} />
        <Stack.Screen name="Perfil" component={DetailsScreen} />
        <Stack.Screen name="Familiares" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Batimento cardíaco</Text>
        <View style={styles.teste}>
          <Text style={styles.btnBpm}>81</Text>
          <Text style={styles.btnB}>bpm</Text>
        </View>
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

function DetailsScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  teste: {
    flexDirection: 'row',
  },
  btn: {
    justifyContent: 'center',
    width: '75%',
    height: 110,
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FF5F54',
    alignSelf: 'center',
  },
  btnText: {
    marginLeft: 30,
    color: '#FF5F54',
    fontSize: 16,
  },
  btnBpm: {
    marginLeft: 50,
    color: '#FF5F54',
    fontSize: 40,
    fontWeight: 'bold',
  },
  icon: {
    alignSelf: 'center',
    marginRight: '15%',
    alignSelf: 'flex-end',
    position: 'absolute',
  },
  monitora: {
    color: '#8B8B8B',
    fontSize: 16,
    alignSelf: 'center',
  },
  btnB: {
    color: '#FF5F54',
    fontSize: 21,
    alignSelf: 'flex-end',
    marginLeft: 5,
  },
});
