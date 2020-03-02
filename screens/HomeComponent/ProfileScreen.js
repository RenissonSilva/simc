import React, { Component } from 'react';
import styles from './style';
import { View, Text, Image } from 'react-native';


export default class ProfileScreen extends Component {
  render() {
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
}
