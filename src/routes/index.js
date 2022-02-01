import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {APP_STACK_SCREENS} from '../constants/index';

const AppStack = createNativeStackNavigator();

const navOptionHandler = () => ({
  headerShown: false,
  tabBarShowLabel: false,
  ...horizontalAnimation,
});

const Routes = props => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Home">
        {APP_STACK_SCREENS.map((screen, key) => (
          <AppStack.Screen
            key={key}
            name={screen.name}
            screenOptions={{
              headerShown: false,
            }}
            component={screen.component}
            // options={navOptionHandler}
          />
        ))}
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
