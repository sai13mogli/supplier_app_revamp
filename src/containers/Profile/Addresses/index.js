import React, {useState,} from 'react';
import Header from '../../../component/common/Header'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../../Theme/Colors';
import Dimension from '../../../Theme/Dimension';
import {
  createMaterialTopTabNavigator
} from '@react-navigation/material-top-tabs';
import {

  ADDRESSES_TAB_SCREENS,
} from '../../../constants';

const Tab = createMaterialTopTabNavigator();

const Addresses = props => {
  
  const tabBarIcon = (focused, color, route, rest) => {
    let currentScreen = ADDRESSES_TAB_SCREENS.find(
      screen => screen.name === route.name,
    );
    let tabName = currentScreen['name'];
    //   let iconName = currentScreen[focused ? 'activeIcon' : 'inactiveIcon'];
    return (
      <TouchableOpacity
        style={styles.iconAlignment}
        onPress={() => rest.navigation.navigate(route.name)}>
        {/* <CustomeIcon name={iconName} size={26} color={color}></CustomeIcon> */}
        {/* {tabName == 'Profile' ? (
                <ProfileTabIcon focused={focused} iconName={iconName} color={color} />
              ) : currentScreen.iconType ? (
                <BottomIcon name={iconName} size={26} color={color} />
              ) : (
                <Icon name={iconName} size={26} color={color} />
              )} */}
        <Text style={[styles.tabText, {color: focused ? color : '#3c3c3c'}]}>
          {tabName}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
  
      <>
   <Header howBack showText={'Addresses'} rightIconName={'business-details'}></Header>
    <Tab.Navigator
       screenOptions={({route, ...rest}) => ({
          headerShown: false,
          tabBarIcon: ({focused, color}) =>
            tabBarIcon(focused, color, route, rest),
          lazy: false,
          safeAreaInsets: {bottom: 0},
        })}
        tabBarOptions={tabBarOptions}>
        {ADDRESSES_TAB_SCREENS.map((screen, key) => (
          <Tab.Screen
            key={key}
            lazy={false}
            name={screen.name}
            component={prop => (
              <screen.component {...prop} />
            )}
          />
        ))}
      </Tab.Navigator>
    </>
  );
};
const styles = StyleSheet.create({
indicatorStyle:{
  height:2,
  backgroundColor:Colors.BrandColor
},
tabText:{
  fontSize: Dimension.font14,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,
   fontWeight:"normal"
 },
 userName: {
    fontSize: Dimension.font14,
    color: Colors.textColor,
    fontFamily: Dimension.CustomRegularFont,
 },
 tabBar: {
  backgroundColor: '#fff',
},
//   IconDefaultColor: {color: colors.ExtralightGrayText},
tabText: {
  fontSize: 10,
  // fontFamily: Dimension.CustomMediumFont,
  marginTop: 4,
},
iconAlignment: {
  alignItems: 'center', 
  alignSelf: 'center'
},
});

const tabBarOptions = {
  activeTintColor: '#D9232D',
  inactiveTintColor: '#C4C4C4',
  showLabel: false,
  lazy: false,
  style: styles.tabBar,
  safeAreaInsets: {bottom: 0},
};
export default Addresses;