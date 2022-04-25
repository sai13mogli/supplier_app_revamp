import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import AppHeader from '../../component/common/Header';
import Dimension from '../../Theme/Dimension';
import Colors from '../../Theme/Colors';

const AboutUsScreen = props => {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <AppHeader
        showText={'About Us'}
        navigation={props.navigation}
        showBack
        showBell={false}
      />
      <Text style={styles.nrmtxt}>
        Moglix Supplier Central App is designed for Suppliers currently doing
        business with Moglix as well as for interested manufacturers, traders
        and authorized dealers who wish to partner with us. The app is created
        to help you manage your business from anywhere and anytime. Our
        objective is to smoothen all business processes, cut the hassle of calls
        and emails by providing you the real time information on your mobile.
        {'\n'} {'\n'}
        <View style={styles.headDesign}>
          <Text style={styles.textDesign}>New to Moglix business? </Text>
        </View>
        {'\n'}
        <Text>
          Register yourself by furnishing your personal details, GSTIN, pickup
          address, and mandatory Documents. Our team will verify your profile
          and do the activation (meanwhile if you have any queries, feel free to
          raise a support ticket from the Support tab of app). {'\n'}Now you are
          ready to start receiving orders from us – view order summary and track
          your orders via the app. {'\n'} {'\n'}
        </Text>
        <View style={styles.headDesign}>
          <Text style={styles.textDesign}>
            Manage your existing Moglix business?{' '}
          </Text>
        </View>
        {'\n'}
        Login your account with your email or phone number or registered Google
        account. View order summary and take actions directly from the
        dashboard. {'\n'} {'\n'}If you are an{' '}
        <Text style={{color: 'blue'}}>enterprise Supplier</Text>, you can
        acknowledge your orders and request for pickup reschedule in case of
        stock outs. You have the complete visibility of your orders now. {'\n'}
        {'\n'}
        If you are an <Text style={{color: 'blue'}}>online Supplier</Text>, you
        can request for pickup reschedule in case of stock outs (oneship
        orders). You can process your dropship orders, all the way from New to
        Delivery.{'\n'}
        {'\n'}You can also track your returns and download the debit notes on
        the go. You have the option to switch between enterprise and online
        business view by a simple toggle.Raise a ticket from the Support tab if
        you have any queries and we will respond within 2 hours.{'\n'}You can as
        well view the status of your tickets and respond accordingly. We will
        notify you on important events and keep you updated at all times. Just
        remember to click on the bell icon to know about updates.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logoutBtnWrap: {
    paddingHorizontal: Dimension.padding20,
    paddingVertical: Dimension.paddng15,
    backgroundColor: Colors.WhiteColor,
  },
  nrmtxt: {
    fontSize: Dimension.font12,
    marginLeft: Dimension.margin10,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
  },
  headDesign: {
    backgroundColor: Colors.grayShade11,
  },
  textDesign: {
    fontSize: Dimension.font14,
    fontStyle: 'italic',
    color: 'black',
  },
});

export default AboutUsScreen;
