import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import AppHeader from '../../component/common/Header';
import {logout} from '../../redux/actions/profile';
import Dimension from '../../Theme/Dimension';
import Colors from '../../Theme/Colors';
import CustomeIcon from '../../component/common/CustomeIcon';

const SettingsScreen = props => {
  const token = useSelector(state => (state.profileReducer || {}).token || '');
  const dispatch = useDispatch();

  const onLogout = async () => {
    await AsyncStorage.removeItem('onlineShipmentMode');
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('fcmToken');
    await AsyncStorage.removeItem('onlineFlag');
    await AsyncStorage.removeItem('enterpriseFlag');
    props.route.params.setIsLoggedIn(false);
    dispatch(logout(token));
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <AppHeader
        showText={'Settings'}
        navigation={props.navigation}
        showBack
        showBell
      />
      <View style={styles.bgWrapper}>
        <Text style={styles.headingtxt}>SMS PREFERENCES</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: Dimension.margin10,
          }}>
          <Text style={styles.nrmtxt}>
            Orders related SMS cannot be disabled as the are Critical to provide
            Services
          </Text>
        </View>
      </View>
      <View style={styles.bgWrapper}>
        <Text style={styles.headingtxt}>NOTIFICATION SETTINGS</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: Dimension.margin10,
          }}>
          <Text style={styles.nrmtxt}>Order Related in app Notifications</Text>
          <CustomeIcon
            name={'toggle-line'}
            color={Colors.headerTxtColor}
            size={Dimension.font18}></CustomeIcon>
        </View>
      </View>
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
    paddingHorizontal: Dimension.padding20,
    paddingVertical: Dimension.paddng15,
    backgroundColor: Colors.WhiteColor,
  },
  logoutBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Dimension.padding20,
    paddingVertical: Dimension.padding12,
    borderRadius: 4,
    backgroundColor: Colors.grayShade1,
  },
  logoutBtnTxt: {
    fontSize: Dimension.font14,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
  },
  bgWrapper: {
    borderRadius: 4,
    backgroundColor: Colors.grayShade1,
    padding: Dimension.padding10,
    marginHorizontal: Dimension.margin20,
    marginBottom: Dimension.margin20,
  },
  headingtxt: {
    fontSize: Dimension.font12,
    color: Colors.eyeIcon,
    fontFamily: Dimension.CustomMediumFont,
    marginBottom: Dimension.margin5,
  },
  nrmtxt: {
    fontSize: Dimension.font12,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
  },
});

export default SettingsScreen;
