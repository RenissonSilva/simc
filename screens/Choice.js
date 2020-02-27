import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  View,
  ImageBackground,
} from 'react-native';

export default class App extends React.Component {
  static navigationOptions = {
    headerTitle: 'Entrar',
    headerStyle: {backgroundColor: '#FF5F54'},
    headerTintColor: 'white',
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textExplica}>Selecione seu perfil</Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            this.props.navigation.navigate('PatientLogin');
          }}>
          <Icon name="user" size={70} color="#fff" style={styles.icon} />
          <Text style={styles.btnText}>Paciente</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            this.props.navigation.navigate('RelativeLogin');
          }}>
          <Icon name="users" size={70} color="#fff" style={styles.icon} />
          <Text style={styles.btnText}>Familiar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            this.props.navigation.navigate('DoctorLogin');
          }}>
          <Icon name="user-md" size={70} color="#fff" style={styles.icon} />
          <Text style={styles.btnText}>Médico</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topMenu: {
    backgroundColor: '#FF5F54',
    height: 70,
    flexDirection: 'row',
  },
  textMenu: {
    flex: 2,
    color: '#fff',
    fontSize: 24,
    alignSelf: 'center',
  },
  textExplica: {
    color: '#FF5F54',
    fontSize: 26,
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '75%',
    height: 110,
    backgroundColor: '#FF5F54',
    margin: 15,
    borderRadius: 10,
    alignSelf: 'center',
  },
  btnText: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 26,
  },
  imgLogo: {
    width: 90,
    height: 90,
    margin: 10,
    alignSelf: 'center',
  },
  icon: {
    alignSelf: 'center',
    marginRight: '5%',
  },
  iconeSeta: {
    alignSelf: 'center',
    marginRight: '10%',
    marginLeft: '5%',
  },
});
