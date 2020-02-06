import React from 'react';

import { View, Text, Button } from 'react-native';

// import { Container } from './styles';

export default class Choice extends React.Component {
  render() {
    return (
        <View>
            <Text>
                Choice
            </Text>
            <Button
                title = "Go to home"
                onPress= {()=>{ this.props.navigation.navigate('Home')}}
            />
        </View>
    );
  }
}
