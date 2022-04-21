import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, Image, ImageBackground, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {setShipmentType} from '../../../redux/actions/orders';
import {fetchedProfile, setRmData} from '../../../redux/actions/profile';
import {rmLogin} from '../../../services/auth';

const SplashScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    const token = await AsyncStorage.getItem('token');
    const rmToken = await AsyncStorage.getItem('rmToken');
    const onlineShipmentMode = await AsyncStorage.getItem('onlineShipmentMode');

    if (token || onlineShipmentMode) {
      if (onlineShipmentMode) {
        dispatch(setShipmentType(onlineShipmentMode));
      }
      if (rmToken) {
        const {data} = await rmLogin({
          token: rmToken,
        });
        if (data.success) {
          await AsyncStorage.setItem(
            'onlineShipmentMode',
            data.data.onlineShipmentMode,
          );
          dispatch(setShipmentType(data.data.onlineShipmentMode));
          dispatch(setRmData(data.data));
        }
      }
      props.route.params.setIsLoggedIn(true);
    } else {
      props.navigation.navigate('Login');
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/loginBg.png')}
      resizeMode="stretch"
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}>
      <Image
        source={require('../../../assets/images/splash.png')}
        resizeMode={'contain'}
        style={{alignSelf: 'center', width: 200, height: 100, margin: 20}}
      />
      <ActivityIndicator style={{alignSelf: 'center'}} />
    </ImageBackground>
  );
};

export default SplashScreen;
