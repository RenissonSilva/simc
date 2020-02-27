import * as React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Button,
  View,
  Text,
  Image,
} from 'react-native';
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
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Perfil" component={ProfileScreen} />
        <Stack.Screen name="Familiares" component={RelativeScreen} />
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

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.imgProfile}
        source={require('../../images/profilePatient.jpg')}
      />
      <Text style={styles.nome}>Renato Silva</Text>
      <Text style={styles.ano}>1996</Text>

      <View style={styles.containerDados}>
        <View style={styles.infoIcon}>
          <Image
            style={styles.imgIcon}
            source={require('../../images/info.png')}
          />
          <Text style={styles.info}>Informações pessoais</Text>
        </View>
        <Text style={styles.dado}>Telefone : 988445577</Text>
        <Text style={styles.dado}>Sexo : Masculino</Text>
        <Text style={styles.dado}>E-mail: renatosilva@gmail.com</Text>
        <Text style={styles.dado}>Ocupação: Engenheiro</Text>

        <View style={styles.infoIcon}>
          <Image
            style={styles.imgIcon}
            source={require('../../images/address.png')}
          />
          <Text style={styles.info}>Endereço</Text>
        </View>
        <Text style={styles.dado}>Av. Fagundes Varela, 100</Text>
        <Text style={styles.dado}>Cidade: Olinda </Text>
        <Text style={styles.dado}>Estado: Pernambuco</Text>
        <Text style={styles.dado}>CEP: 21652-100</Text>
      </View>
    </View>
  );
}

function ChatScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>CHAT!</Text>
    </View>
  );
}

function RelativeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>FAMILIAR!</Text>
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
  imgProfile: {
    borderRadius: 80,
    width: 160,
    height: 160,
    alignSelf: 'center',
    marginTop: 40,
    borderColor: '#FF5F54',
    borderWidth: 2,
  },
  nome: {
    fontSize: 30,
    color: '#FF5F54',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  ano: {
    fontSize: 28,
    color: '#FF5F54',
    alignSelf: 'center',
  },
  info: {
    marginTop: 10,
    paddingBottom: 10,
    fontSize: 22,
    color: '#FF5F54',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  dado: {
    fontSize: 20,
    color: '#FF5F54',
  },
  imgIcon: {
    width: 30,
    height: 30,
    margin: 10,
  },
  infoIcon: {
    flexDirection: 'row',
  },
  containerDados: {
    alignSelf: 'center',
  },
});
