import AsyncStorage from '@react-native-community/async-storage';

export const TOKEN_KEY = "Token";

export const onSignIn = () => AsyncStorage.setItem(TOKEN_KEY, "true");

export const onSignOut = () => AsyncStorage.removeItem(TOKEN_KEY);

export const isSignedIn = async () => {
  const token = await AsyncStorage.getItem('Token').then(
    res => {
      //console.log('auth '+ res);
      return (res === null ) ? true : false;
    }
  );

};