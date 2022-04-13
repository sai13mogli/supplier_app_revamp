import React, { useState } from 'react';
import Header from '../../../component/common/Header';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TOP_TAB_SCREENS } from '../../../constants';
import Dimension from '../../../Theme/Dimension';
import Tabs from '../../../component/common/Tabs'


const BankDetails = props => {
  return (
    <>
      <Header
        showBack
        navigation={props.navigation}
        showText={'Bank Details'}
        rightIconName={'bank-details'}></Header>
      <Tabs data={TOP_TAB_SCREENS.map(_ => ({ ..._ }))} navigation={props.navigation} />

    </>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
  },
  tabText: {
    fontSize: Dimension.font14,
    width: '100%',
    fontFamily: Dimension.CustomMediumFont,
    marginTop: 0,
  },
  iconAlignment: {
    alignItems: 'center',
    alignSelf: 'center',
  },
});


export default BankDetails;
