import React, { useState } from 'react';
import Header from '../../../component/common/Header';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TOP_TAB_SCREENS } from '../../../constants';
import Dimension from '../../../Theme/Dimension';

import Colors from '../../../Theme/Colors';
const Tab = createMaterialTopTabNavigator();

const BankDetails = props => {
  const tabBarIcon = (focused, color, route, rest) => {
    let currentScreen = TOP_TAB_SCREENS.find(
      screen => screen.name === route.name,
    );
    let tabName = currentScreen['name'];
    return (
      <TouchableOpacity
        style={styles.iconAlignment}
        onPress={() => rest.navigation.navigate(route.name)}>
        <Text
          numberOfLines={0}
          style={[styles.tabText, { color: focused ? color : '#3c3c3c' }]}>
          {tabName}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Header
        showBack
        navigation={props.navigation}
        showText={'Bank Details'}
        rightIconName={'bank-details'}></Header>
      <Tab.Navigator
        screenOptions={({ route, ...rest }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color }) =>
            tabBarIcon(focused, color, route, rest),
          lazy: false,
          safeAreaInsets: { bottom: 0 },
          //tabBarStyle: { borderBottomColor:"#000" },
        })}
        tabBarOptions={tabBarOptions}
        
        >
        {TOP_TAB_SCREENS.map((screen, key) => (
          <Tab.Screen
            key={key}
            lazy={false}
            name={screen.name}
            component={prop => <screen.component {...prop} />}
          />
        ))}
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
  },
  tabText: {
    fontSize: Dimension.font14,
   // height: 60,
    width: '100%',
    fontFamily: Dimension.CustomMediumFont,
    marginTop: 0,
  },
  iconAlignment: {
    alignItems: 'center',
    alignSelf: 'center',
  },
});
const tabBarOptions = {
  activeTintColor: Colors.BrandColor,
  inactiveTintColor: Colors.FontColor,
  showLabel: false,
  lazy: false,
  style: styles.tabBar,
  safeAreaInsets: { bottom: 0 },
};

export default BankDetails;
