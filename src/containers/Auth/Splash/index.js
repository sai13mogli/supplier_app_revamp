import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, View} from 'react-native';

const SplashScreen = props => {
  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(token, props);
    if (token) {
      props.route.params.setIsLoggedIn(true);
    } else {
      props.navigation.navigate('Login');
    }
  };

  return (
    <View>
      <ActivityIndicator style={{alignSelf: 'center'}} />
    </View>
  );
};

export default SplashScreen;
