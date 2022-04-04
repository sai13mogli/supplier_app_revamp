import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import AppHeader from '../../component/common/Header';
import {logout} from '../../redux/actions/profile';
import Dimension from '../../Theme/Dimension';
import Colors from '../../Theme/Colors';
import CustomeIcon from '../../component/common/CustomeIcon';

const SettingsScreen = props => {
  const dispatch = useDispatch();

  const onLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userId');
    props.route.params.setIsLoggedIn(false);
    dispatch(logout());
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <AppHeader showText={'Settings'} navigation={props.navigation} showBack />
      <View style={styles.logoutBtnWrap}>
        <TouchableOpacity onPress={onLogout} style={styles.logoutBtn}>
          <Text style={styles.logoutBtnTxt}>LOGOUT</Text>
          <CustomeIcon
            name={'shut-down'}
            color={Colors.FontColor}
            size={Dimension.font16}></CustomeIcon>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoutBtnWrap: {
    paddingHorizontal: Dimension.padding15,
    paddingVertical: Dimension.paddng15,
    backgroundColor: Colors.grayShade3,
  },
  logoutBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Dimension.padding20,
    paddingVertical: Dimension.padding12,
    borderWidth: 1,
    borderColor: Colors.eyeIcon,
    borderRadius: 8,
  },
  logoutBtnTxt: {
    fontSize: Dimension.font14,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
  },
});

export default SettingsScreen;
