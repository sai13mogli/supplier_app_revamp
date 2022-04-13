import React, { useState } from 'react';
import Header from '../../../component/common/Header';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Dimension from '../../../Theme/Dimension';
import { ADDRESSES_TAB_SCREENS } from '../../../constants';
import Tabs from '../../../component/common/Tabs'


const Addresses = props => {


  return (
    <>
      <Header
        showBack
        navigation={props.navigation}
        showText={'Addresses'}
        rightIconName={'business-details'}></Header>
      <Tabs data={ADDRESSES_TAB_SCREENS.map(_ => ({ ..._ }))} navigation={props.navigation} />

    </>
  );
};
const styles = StyleSheet.create({
  tabText: {
    fontSize: Dimension.font15,
    height: 60,
    width: '100%',
    fontFamily: Dimension.CustomRobotoBold,
    marginTop: 0,
  },

  tabBar: {
    backgroundColor: '#fff',
  },
  iconAlignment: {
    backgroundColor: '#fff',
    width: '100%',
    flex: 1,
  },
});


export default Addresses;
