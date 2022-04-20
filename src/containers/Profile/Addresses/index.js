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




export default Addresses;
