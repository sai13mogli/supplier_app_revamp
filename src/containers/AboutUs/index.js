import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
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
      <ScrollView
        bounces
        style={styles.ContainerCss}
        contentContainerStyle={{paddingBottom: 80}}>
        <Text style={styles.nrmtxt}>
          Moglix Supplier Central App is designed for Suppliers currently doing
          business with Moglix as well as for interested manufacturers, traders
          and authorized dealers who wish to partner with us. The app is created
          to help you manage your business from anywhere and anytime. Our
          objective is to smoothen all business processes, cut the hassle of
          calls and emails by providing you the real time information on your
          mobile.
        </Text>

        <View style={styles.headDesign}>
          <Text style={styles.textDesign}>New to Moglix business? </Text>
        </View>
        <View style={styles.rowCss}>
          <View style={styles.bullet}></View>
          <Text style={styles.nrmtxt}>
            Register yourself by furnishing your personal details, GSTIN, pickup
            address, and mandatory Documents.{' '}
          </Text>
        </View>
        <View style={styles.rowCss}>
          <View style={styles.bullet}></View>
          <Text style={styles.nrmtxt}>
            Our team will verify your profile and do the activation (meanwhile
            if you have any queries, feel free to raise a support ticket from
            the Support tab of app).
          </Text>
        </View>
        <View style={styles.rowCss}>
          <View style={styles.bullet}></View>
          <Text style={styles.nrmtxt}>
            Now you are ready to start receiving orders from us – view order
            summary and track your orders via the app.
          </Text>
        </View>
        <View style={styles.headDesign}>
          <Text style={styles.textDesign}>
            Manage your existing Moglix business?{' '}
          </Text>
        </View>
        <View style={styles.rowCss}>
          <View style={styles.bullet}></View>
          <Text style={styles.nrmtxt}>
            Login your account with your email or phone number or registered
            Google account. View order summary and take actions directly from
            the dashboard.
          </Text>
        </View>
        <View style={styles.rowCss}>
          <View style={styles.bullet}></View>
          <Text style={styles.nrmtxt}>
            If you are an{' '}
            <Text style={{color: 'blue'}}> enterprise Supplier </Text>you can
            acknowledge your orders and request for pickup reschedule in case of
            stock outs. You have the complete visibility of your orders now.
          </Text>
        </View>
        <View style={styles.rowCss}>
          <View style={styles.bullet}></View>
          <Text style={styles.nrmtxt}>
            If you are an <Text style={{color: 'blue'}}>online Supplier</Text>,
            you can request for pickup reschedule in case of stock outs (oneship
            orders).
          </Text>
        </View>
        <View style={styles.rowCss}>
          <View style={styles.bullet}></View>
          <Text style={styles.nrmtxt}>
            You can process your dropship orders, all the way from New to
            Delivery.
          </Text>
        </View>
        <View style={styles.rowCss}>
          <View style={styles.bullet}></View>
          <Text style={styles.nrmtxt}>
            You can also track your returns and download the debit notes on the
            go.
          </Text>
        </View>
        <View style={styles.rowCss}>
          <View style={styles.bullet}></View>
          <Text style={styles.nrmtxt}>
            You have the option to switch between enterprise and online business
            view by a simple toggle.
          </Text>
        </View>
        <View style={styles.rowCss}>
          <View style={styles.bullet}></View>
          <Text style={styles.nrmtxt}>
            Raise a ticket from the Support tab if you have any queries and we
            will respond within 2 hours.
          </Text>
        </View>
        <View style={styles.rowCss}>
          <View style={styles.bullet}></View>
          <Text style={styles.nrmtxt}>
            You can as well view the status of your tickets and respond
            accordingly.
          </Text>
        </View>
        <View style={styles.rowCss}>
          <View style={styles.bullet}></View>
          <Text style={styles.nrmtxt}>
            We will notify you on important events and keep you updated at all
            times. Just remember to click on the bell icon to know about
            updates.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ContainerCss: {
    padding: Dimension.padding15,
  },

  nrmtxt: {
    fontSize: Dimension.font12,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
    // marginBottom:Dimension.margin8
  },
  headDesign: {
    backgroundColor: Colors.grayShade11,
    alignSelf: 'flex-start',
    marginVertical: Dimension.margin10,
  },
  textDesign: {
    fontSize: Dimension.font14,
    fontStyle: 'italic',
    color: 'black',
  },
  bullet: {
    height: Dimension.height5,
    width: Dimension.width5,
    borderRadius: Dimension.width5,
    backgroundColor: Colors.blackColor,
    marginRight: Dimension.margin8,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  rowCss: {
    flexDirection: 'row',
    marginBottom: Dimension.margin5,
  },
});

export default AboutUsScreen;
