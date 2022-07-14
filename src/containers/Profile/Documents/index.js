import React, {useState} from 'react';
import Header from '../../../component/common/Header';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Dimension from '../../../Theme/Dimension';
import {DOCUMENTS_TAB_SCREENS} from '../../../constants';
import Tabs from '../../../component/common/Tabs';

const Addresses = props => {
  return (
    <>
      <Header
        showBack
        showBell
        navigation={props.navigation}
        showText={'Documents'}
        rightIconName={'single-product-upload'}></Header>
      <Tabs
        data={DOCUMENTS_TAB_SCREENS.map(_ => ({..._}))}
        // navigation={props.navigation}
        {...props}
      />
    </>
  );
};

export default Addresses;
